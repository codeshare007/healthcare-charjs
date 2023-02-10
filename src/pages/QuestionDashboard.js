import { useEffect, useMemo, useState } from "react";
import SweetAlert2 from "react-sweetalert2";
import styled from "styled-components";
import Select, { components } from "react-select";

import Spiner from "../components/Spiner";

import { fetchPOST } from "../utils/api";
import allQuestions from "../questions";

import ChartBoard from "./ChartBoard";

import { MULTI_SELECT_QUESTIONS } from "../utils/constants";

function QuestionDashboard({ categories }) {
  //API-1
  const [allData, setAllData] = useState();
  const [questionName, setQuestionName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [title, setTitle] = useState({});
  const [swalProps, setSwalProps] = useState({});
  let [loading, setLoading] = useState(true);

  const handleQuestionChange = (selectedQuestion) => {
    setSelectedOption(selectedQuestion.value);
    setQuestionName(selectedQuestion.value);
    let mainTitle = "";
    if (selectedQuestion.graph_title) {
      mainTitle = selectedQuestion.graph_title;
    } else if (selectedQuestion.updated_label) {
      mainTitle = selectedQuestion.updated_label;
    } else {
      mainTitle = selectedQuestion.label;
    }
    setTitle({
      main: mainTitle,
      sub: selectedQuestion.chart_subtitle,
    });
  };

  useEffect(() => {
    const filteredQuestions = allQuestions.filter((q) =>
      categories
        ? categories.includes(q.category) || categories.includes(q.category2)
        : q
    );
    setQuestions(filteredQuestions);
    setSelectedOption(filteredQuestions[0].value);
    setQuestionName(filteredQuestions[0].value);

    let mainTitle = "";
    if (filteredQuestions[0].graph_title) {
      mainTitle = filteredQuestions[0].graph_title;
    } else if (filteredQuestions[0].updated_label) {
      mainTitle = filteredQuestions[0].updated_label;
    } else {
      mainTitle = filteredQuestions[0].label;
    }
    setTitle({
      main: mainTitle,
      sub: filteredQuestions[0].chart_subtitle,
    });
  }, [categories]);

  useEffect(() => {
    setLoading(!loading);
    setAllData({});
    if (!questionName) return;
    fetchPOST("/api-2", { questionname: questionName })
      .then((res) => {
        const mainData = res[questionName];
        if (mainData[0] && !Array.isArray(mainData[0])) {
          res[questionName] = mainData.map((md) => [
            Object.keys(md)[0],
            Object.values(md)[0],
          ]);
        }
        setAllData(res);
        setLoading(loading);
      })
      .catch((e) => {
        setSwalProps({
          show: true,
          title: "Something went wrong",
          text: "Please refresh the page",
        });
        console.log(e.message);
      });
  }, [questionName]);

  const { [questionName]: allMainData, ["total_weight"]:totalWeightForMulti, ...allDemoData } = allData || {};

  const isMultiSelectQuestion = useMemo(
    () => MULTI_SELECT_QUESTIONS.includes(questionName),
    [questionName]
  );

  const Option = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="cursor-pointer hover:bg-lime-200 focus:bg-lime-200 border-solid border-b-2 border-slate-200"
      >
        {data.order} - {data.updated_label ? data.updated_label : data.label}
      </div>
    );
  };

  return (
    <div>
      <SweetAlert2 {...swalProps} />
      <P1>Select a question:</P1>

      <Select
        options={questions}
        value={questions.filter(function (q) {
          return q.value === selectedOption;
        })}
        formatOptionLabel={(option, { context }) => {
          return `${option.order} - ${
            option.updated_label ? option.updated_label : option.label
          }`;
        }}
        components={{ Option }}
        onChange={handleQuestionChange}
      />

      <Spiner visible={loading && questionName !== ""} />

      <ChartBoard
        allMainData={allMainData}
        allDemoData={allDemoData}
        totalWeight={totalWeightForMulti}
        title={title}
        multi={isMultiSelectQuestion}
      />
    </div>
  );
}

export default QuestionDashboard;

// const Tabs = styled.div`
//   width: 80%;
//   margin: 0 auto;
//   max-width: 996px;
//   display: flex;
// `;

// const TabSelected = styled.p`
//   padding: 4px 15px;
//   font-size: 20px;
//   color: white;
//   border: 1px solid white;
//   background-color: #6658fb;
//   border-top-left-radius: 3px;
//   border-top-right-radius: 3px;
//   margin-right: 1px;
//   cursor: pointer;
// `;

// const Tab = styled.p`
//   padding: 4px 15px;
//   font-size: 20px;
//   color: #6658fb;
//   border: 1px solid #c6c0ff;
//   background-color: white;
//   border-top-left-radius: 3px;
//   border-top-right-radius: 3px;
//   cursor: pointer;
// `;

// const Container = styled.div`
//   width: 80%;
//   margin: 0 auto;
//   max-width: 996px;
//   background-color: #a9a0ff;
//   padding: 20px;
//   border-radius: 5px;
// `;

// const Label = styled.p`
//   font-size: 15px;
//   color: white;
// `;

const P1 = styled.p`
  font-size: 28px;
  color: white;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SelectStyled = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;
  }
`;
