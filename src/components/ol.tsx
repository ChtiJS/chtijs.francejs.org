const OrderedList = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.OlHTMLAttributes<HTMLOListElement>) => (
  <ol className="root" {...props}>
    {children}
    <style jsx>{`
      .root {
        margin: 0 0 var(--vRythm) 0;
      }
    `}</style>
  </ol>
);

export default OrderedList;
