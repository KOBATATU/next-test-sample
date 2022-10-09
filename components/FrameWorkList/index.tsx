type FrameWorkListProps = {
  frameworks?: Array<{ id: number; item: string }>;
};

const FrameWorkList = ({ frameworks }: FrameWorkListProps) => {
  if (!frameworks || !frameworks.length) {
    return <h1>no data</h1>;
  }

  return (
    <div>
      <ul>
        {frameworks.map((framework) => (
          <li key={framework.id}>{framework.item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FrameWorkList;
