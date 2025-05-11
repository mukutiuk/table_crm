import { Header } from "./components/Header";
import { HeaderBottom } from "./components/HeaderBottom";
import { Table } from "./components/Table";
import { TableInteraction } from "./components/TableInteraction";
import "./index.css";

function App() {


  return (
    <div className="pr-[50px] pl-[50px]">
      <Header />
      <HeaderBottom />
      <TableInteraction />
      <Table />
    </div>
  );
}

export default App;
