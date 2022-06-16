import { useEffect, useRef, useState } from "react";
import List from "./components/List";
import Form from "./components/Form";
import { Sub, SubsResponseFromApi } from "./types";
import "./App.css";
import axios from "axios";

interface AppState {
  subs: Array<Sub>;
  newSubsNumber: number;
}

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubsNumber, setNewSubsNumber] =
    useState<AppState["newSubsNumber"]>(0);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSubs = async (): Promise<SubsResponseFromApi> => {
      const response = await axios.get("http://localhost:3001/subs");
      return response.data;
    };

    const mapFromApiToSubs = (apiResponse: SubsResponseFromApi): Array<Sub> => {
      return apiResponse.map((subFromApi) => {
        const {
          months: subMonths,
          profileUrl: avatar,
          nick,
          description,
        } = subFromApi;
        return {
          nick,
          description,
          avatar,
          subMonths,
        };
      });
    };
    fetchSubs().then(mapFromApiToSubs).then(setSubs);
  }, []);

  const handleNewSub = (newSub: Sub): void => {
    setSubs((subs) => [...subs, newSub]);
    setNewSubsNumber((n) => n + 1);
  };

  return (
    <div className="App" ref={divRef}>
      <h1>Typescript | React</h1>
      New cards: {newSubsNumber}
      <Form onNewSub={handleNewSub} />
      <List subs={subs} />
    </div>
  );
}

export default App;
