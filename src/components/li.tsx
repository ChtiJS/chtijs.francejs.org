const ListItem = ({
    children,
    ...props
}: {
  children: React.ReactNode;
} & React.LiHTMLAttributes<HTMLLIElement>) => (
  <li className="root" {...props}>
    {children}
    <style jsx>{`
      .root > :global(:first-child:last-child) {
        margin: 0;
      }
    `}</style>
  </li>
);

export default ListItem;
