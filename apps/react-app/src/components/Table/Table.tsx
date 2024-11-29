interface TableProps {
    name: string;
    id: number;
  }

const Table = ({category}: {category: TableProps[]}) => {
  return (
    <div>
      <h1>Categories</h1>
      <ul>
      {category.map((data) => (
          <li key={data.id}>{data.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Table;
