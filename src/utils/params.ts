import YError from "yerror";
import type { NextRouter } from "next/router";

export type CastedQueryParamItem = boolean | number | string;
export type CastedQueryParamCollection = boolean[] | number[] | string[];
export type CastedQueryParam =
  | CastedQueryParamItem
  | CastedQueryParamCollection;
export type CastedQueryParams = Record<string, CastedQueryParam>;
export type QueryParamType = "boolean" | "number" | "string";
export type QueryParamCastedTypes = {
  boolean: boolean;
  number: number;
  string: string;
};
export type QueryParamMode = "unique" | "collection";
export type QueryParamDefinition = Record<
  string,
  {
    type: QueryParamType;
    mode: QueryParamMode;
  }
>;
export type BuildQueryParamsType<T extends QueryParamDefinition> = {
  [P in keyof T]?: T[P]["mode"] extends "collection"
    ? QueryParamCastedTypes[T[P]["type"]][]
    : QueryParamCastedTypes[T[P]["type"]];
};
type ParamStringifyer = (
  queryValue: undefined | QueryParamType
) => string | undefined;

const QUERY_PARAMS_TYPE_CASTERS: Record<
  QueryParamType,
  (queryValue: string | undefined) => undefined | CastedQueryParamItem
> = {
  boolean: (queryValue): undefined | boolean =>
    queryValue === "true" ? true : queryValue === "false" ? false : undefined,
  string: (queryValue): undefined | string =>
    typeof queryValue === "string" ? queryValue : undefined,
  number: (queryValue): undefined | number =>
    typeof queryValue !== "undefined" && Number.isFinite(parseFloat(queryValue))
      ? parseFloat(queryValue)
      : undefined,
};
const QUERY_PARAMS_TYPE_STRINGIFYERS: Record<QueryParamType, ParamStringifyer> =
  {
    boolean: ((queryValue: boolean | undefined): string | undefined =>
      queryValue === true
        ? "true"
        : queryValue === false
        ? "false"
        : undefined) as ParamStringifyer,
    string: (queryValue: string | undefined): string | undefined =>
      typeof queryValue === "string" ? queryValue : undefined,
    number: ((queryValue: number | undefined): string | undefined =>
      typeof queryValue === "number"
        ? queryValue.toString(10)
        : undefined) as ParamStringifyer,
  };

export function readParams<T extends CastedQueryParams>(
  definitions: QueryParamDefinition,
  query: NextRouter["query"]
): T {
  return Object.keys(definitions).reduce((castedQuery, definitionName) => {
    const values: string[] =
      typeof query[definitionName] === "undefined"
        ? []
        : typeof query[definitionName] === "string"
        ? [query[definitionName] as string]
        : (query[definitionName] as string[]);
    let castedValue: CastedQueryParam | undefined;

    if (definitions[definitionName].mode === "collection") {
      castedValue = values
        .map(QUERY_PARAMS_TYPE_CASTERS[definitions[definitionName].type])
        .filter(
          (value) => typeof value !== "undefined"
        ) as CastedQueryParamCollection;

      if (castedValue.length !== values.length) {
        throw new YError("E_BAD_QUERY_PARAMS_TYPE", definitionName);
      }
    } else {
      castedValue = QUERY_PARAMS_TYPE_CASTERS[definitions[definitionName].type](
        values.length === 1 ? values[0] : undefined
      );

      if (values.length && typeof castedValue === "undefined") {
        throw new YError("E_BAD_QUERY_PARAM_TYPE", definitionName);
      }
    }

    if (typeof castedValue !== "undefined") {
      return {
        ...castedQuery,
        [definitionName]: castedValue,
      };
    }

    return castedQuery;
  }, {} as T);
}

export function buildPath<T extends CastedQueryParams>(
  definitions: QueryParamDefinition,
  router: Pick<NextRouter, "basePath" | "pathname" | "query">,
  addedParams: Partial<T>
): string {
  const currentParams: CastedQueryParams = readParams(
    definitions,
    router.query
  );
  const parts = Array.from(
    new Set([...Object.keys(addedParams), ...Object.keys(currentParams)])
  )
    .sort()
    .reduce((parts: string[], paramKey) => {
      const definition = definitions[paramKey];
      let addedParts: string[];

      if (!definition) {
        throw new YError("E_UNDEFINED_QUERY_PARAM", paramKey);
      }

      if (definition.mode === "collection") {
        addedParts = Array.from(
          new Set([
            ...(
              (addedParams[paramKey] || currentParams[paramKey]) as string[]
            ).map<string>(
              (castedValue: CastedQueryParamItem): string =>
                QUERY_PARAMS_TYPE_STRINGIFYERS[definition.type](
                  castedValue as QueryParamType
                ) as string
            ),
          ])
        );
      } else {
        const actualValue =
          paramKey in addedParams
            ? addedParams[paramKey]
            : currentParams[paramKey];

        addedParts =
          typeof actualValue !== "undefined"
            ? [
                QUERY_PARAMS_TYPE_STRINGIFYERS[definition.type](
                  actualValue as QueryParamType
                ) as string,
              ]
            : [];
      }
      return [
        ...parts,
        ...addedParts.map(
          (value) => paramKey + "=" + encodeURIComponent(value)
        ),
      ];
    }, [] as string[]);

  return (
    router.basePath +
    router.pathname +
    (parts.length ? "?" + parts.join("&") : "")
  );
}
