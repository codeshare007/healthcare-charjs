import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";

import Spiner from "../components/Spiner";

import Chart from "../components/Chart";
import { fetchPOST } from "../utils/api";
import { BACK_COLORS, DEMOCHARTLABELS } from "../utils/constants";

const DemographicBoard = ({ api }) => {
  const [data, setData] = useState({});
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData({});
    fetchPOST(`/${api}`, {})
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [api]);
  const processData = (subData) => {
    return {
      labels: subData.map((d) => d[0]),
      values: subData.map((d) => d[1]),
    };
  };
  const charts = useMemo(() => {
    return Object.keys(DEMOCHARTLABELS)
      .filter((dl) => !!data[dl])
      .map((dl) => {
        const { label } = DEMOCHARTLABELS[dl];
        const { labels, values } = processData(data[dl] || []);

        return (
          <div key={dl} className="bg-indigo-custom rounded pb-3 h-80">
            <Chart
              name={dl}
              title={label}
              labels={labels}
              values={values}
              type="demographic"
              backgroundColors={BACK_COLORS[0]}
            />
          </div>
        );
      });
  }, [data]);
  return (
    <div>
      <P2>Demographics data</P2>

      <Spiner visible={loading} />

      {Object.keys(data).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-x-5 gap-y-15 gap-4 mt-5">
          {charts}
        </div>
      )}
    </div>
  );
};
export default DemographicBoard;

const P2 = styled.p`
  font-size: 22px;
  color: white;
  margin: 20px 0;
`;
