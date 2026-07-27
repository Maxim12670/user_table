import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchForm = ({ onChange, onClick }) => {
  const handleChange = (event) => {
    const str = event.target.value;
    onChange(str);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "700px",
        gap: "12px",
      }}
    >
      <Input
        placeholder="Поиск по ФИО, возрасту, полу, номеру телефона..."
        onChange={handleChange}
      />
      <Button icon={<SearchOutlined />} type="primary" onClick={onClick}>
        Поиск
      </Button>
    </div>
  );
};

export default SearchForm;
