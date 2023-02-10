import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import Select, { components } from "react-select";

import Chart from "../components/Chart";

import { BACK_COLORS, DEMOCHARTLABELS } from "../utils/constants";

function ChartBoard({ allMainData, allDemoData, totalWeight, title, multi }) {
  const processData = (data, type) => {
    const labels =
      type === "main" ? data.map((d) => d[0]) : data.map((d) => d.key);
    const values =
      type === "main" ? data.map((d) => d[1]) : data.map((d) => d.value);
    const optionWeights = type === "main" ? null : data.map((d) => d.option_weight);
    return {
      labels,
      values,
      optionWeights,
    };
  };

  const { labels: mainLabels, values: mainValues } = useMemo(() => {
    return processData(allMainData || [], "main");
  }, [allMainData]);

  const multiSelectOptions = useMemo(() => {
    return mainLabels.map((ml) => {
      return { value: ml, label: ml };
    });
  }, [mainLabels]);

  const [selectedOption, setSelectedOption] = useState(multiSelectOptions[0]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    setSelectedOption(multiSelectOptions[0]);
  }, [multiSelectOptions]);

  const charts = useMemo(() => {
    return Object.keys(DEMOCHARTLABELS)
      .filter((dl) => !!allDemoData[dl])
      .map((dl) => {
        const { label, shape } = DEMOCHARTLABELS[dl];
        const { labels, values, optionWeights } = processData(
          allDemoData[dl],
          "demo"
        );

        return (
          <div key={dl} className="bg-indigo-custom rounded pb-3 h-96">
            <Chart
              name={dl}
              title={label}
              labels={labels}
              mainLabels={mainLabels}
              values={values}
              totalWeight={totalWeight}
              optionWeights={optionWeights}
              option={selectedOption?.value}
              shape={shape}
              type={multi ? "multichart" : "demochart"}
              backgroundColors={multi ? BACK_COLORS[0] : BACK_COLORS}
            />
          </div>
        );
      });
  }, [allDemoData, mainLabels, selectedOption]);

  return (
    <>
      {allMainData && Object.keys(allMainData).length > 0 && (
        <div className="max-w-7xl pt-6 m-0">
          <div className="bg-indigo-custom pb-8 rounded justify-center">
            <div className="w-full">
              <div className="text-center text-xl pt-4 text-white">
                {title.main}
              </div>
              {title.sub && (
                <div className="text-center text-base pt-4 text-white">
                  {title.sub}
                </div>
              )}
            </div>
            <div className={"w-full " + (multi ? "h-128" : "h-96")}>
              <Chart
                name="main"
                labels={mainLabels}
                values={mainValues}
                totalWeight={totalWeight}
                type="main"
                subType={multi ? "multi" : "general"}
                shape="bar"
                backgroundColors={BACK_COLORS}
              />
            </div>
          </div>

          {multi ? (
            <>
              <P2>
                Use the dropdown to see how responses differ by type of
                respondent
              </P2>
              <P3>View the percentage of respondents who selected….</P3>
              <Select
                options={multiSelectOptions}
                value={selectedOption}
                onChange={handleOptionChange}
              />
            </>
          ) : (
            <>
              <P2>How did different groups respond?</P2>
              <P3>
                You can click on the response options in the graph legend to
                remove them from the display. For example, if you only want to
                see those who “strongly agree” you can click off the other
                options to focus on the percentage of people who chose this
                response.
              </P3>
              <P3>
                Move your cursor over the graph to see the exact percentages.
                {/* as well as the total number who selected that response. Please keep
                in mind that there is uncertainty in estimates when comparing
                groups, especially when the numbers in a specific group are
                small. */}
              </P3>
            </>
          )}

          {Object.keys(allDemoData).length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-15 gap-4 mt-5">
              {charts}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ChartBoard;

const P2 = styled.p`
  font-size: 22px;
  color: white;
  margin: 20px 0;
`;

const P3 = styled.p`
  font-size: 18px;
  color: white;
  margin: 10px 0;
`;
