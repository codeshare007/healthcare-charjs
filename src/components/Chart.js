import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  SubTitle,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

// import pattern from "patternomaly";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  SubTitle,
  Tooltip,
  Legend,
  ArcElement
);

function Chart({
  title,
  subTitle,
  labels,
  values,
  totalWeight,
  optionWeights,
  option,
  type,
  subType,
  mainLabels,
  backgroundColors,
}) {
  const barOptions = {
    spanGaps: false,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
          font: {
            size: 11,
          },
        },
      },
      title: {
        display: true,
        text: title,
        color: "white",
        font: {
          size: 17,
        },
      },
      tooltip: {
        callbacks: {},
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: "white",
        },
        border: {
          display: false,
        },
        ticks: {
          color: "white",
          callback: function (val, index) {
            const label = this.getLabelForValue(val);

            if (label?.split("(").length > 1 && type === "demochart") {
              return label?.split("(")[0];
            }

            if (label.length > 30) {
              let multipleLines = [];
              const labelWords = label.split(" ");
              const lineLength = Math.round(labelWords.length / 2);
              multipleLines.push(labelWords.slice(0, lineLength).join(" "));
              multipleLines.push(labelWords.slice(lineLength).join(" "));
              return multipleLines;
            }
            return label;
          },
        },
        stacked: true,
      },
      y: {
        min: 0,
        max: 1,
        grid: {
          display: true,
        },
        title: {
          display: true,
          color: "white",
          font: {
            size: 17,
          },
        },
        ticks: {
          display: true,
          callback: function (value) {
            return value * 100 + "%";
          },
          color: "white",
        },
        border: {
          display: true,
        },
        stacked: true,
      },
    },
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
        color: "white",
        font: {
          size: 20,
        },
      },
      subtitle: {
        display: false,
        text: subTitle,
        color: "white",
        font: {
          size: 17,
        },
      },
      tooltip: {
        callbacks: {},
      },
    },
  };

  const datasets = [];

  if (type === "main") {
    const total =
      subType === "multi"
        ? totalWeight
        : values.reduce((partialSum, v) => partialSum + v, 0);
    const chartOptions = subType === "multi" ? barOptions : donutOptions;
    chartOptions.plugins.tooltip.callbacks.label = (context) => {
      let label = context.label || "";

      if (label) {
        label += ": ";
      }
      if (context.parsed !== null) {
        const tooltipValue =
          subType === "multi" ? context.parsed.y : context.parsed / total;
        label += Math.round(tooltipValue * 100) + "%";
      }
      return label;
    };

    // TODO: Bring this back later if need be
    // chartOptions.plugins.tooltip.callbacks.afterLabel = (context) => {
    //   const numerator = values[context.dataIndex].toFixed(2);
    //   const denominator = total.toFixed(2);
    //   return `(  ${numerator} / ${denominator} )`;
    // };

    barOptions.scales.y.title.text = "% of respondents";
    barOptions.plugins.legend.display = false;
    datasets.push({
      data: subType === "multi" ? values.map((v) => v / total) : values,
      backgroundColor: backgroundColors,
    });
  } else if (type === "demochart") {
    barOptions.plugins.tooltip.callbacks.label = (context) => {
      let label = context.dataset.label || "";

      if (label) {
        label += ": ";
      }
      if (context.parsed.y !== null) {
        label += Math.round(context.parsed.y * 100) + "%";
      }
      return label;
    };

    // TODO: Bring this back later if need be
    // barOptions.plugins.tooltip.callbacks.afterLabel = (context) => {
    //   const total = values[context.dataIndex].reduce((partialSum, v) => partialSum + v[1], 0);
    //   const denominator = total.toFixed(2);
    //   const numerator = values[context.dataIndex][context.datasetIndex][1].toFixed(2);
    //   return `(  ${numerator} / ${denominator} )`;
    // };

    barOptions.scales.y.title.text = "% of respondents";
    mainLabels.forEach((l, idx) => {
      datasets.push({
        label: l,
        data: values.map((val) => {
          let sum = 0;
          val.forEach((v) => {
            sum += v[1];
          });
          return val[idx] ? val[idx][1] / sum : 0;
        }),
        backgroundColor: backgroundColors[idx],
      });
    });
  } else if (type === "multichart") {
    barOptions.plugins.tooltip.callbacks.label = (context) => {
      let label = context.dataset.label || "";

      if (label) {
        label += ": ";
      }
      if (context.parsed.y !== null) {
        label += Math.round(context.parsed.y * 100) + "%";
      }
      return label;
    };

    // TODO: Bring this back later if need be
    // barOptions.plugins.tooltip.callbacks.afterLabel = (context) => {
    //   const total = values[context.dataIndex].reduce((partialSum, v) => partialSum + v[1], 0);
    //   const denominator = total.toFixed(2);
    //   const numerator = values[context.dataIndex].find(v => v[0] === option)[1].toFixed(2);
    //   return `(  ${numerator} / ${denominator} )`;
    // };

    barOptions.scales.x.stacked = false;
    barOptions.scales.y.stacked = false;
    barOptions.plugins.legend.display = false;
    const newValues = [];
    values.forEach((val, idx) => {
      let selectedOptionVal = 0;
      val.forEach((v) => {
        if (v[0] === option) {
          selectedOptionVal = v[1];
        }
      });
      newValues.push(selectedOptionVal / optionWeights[idx]);
    });
    barOptions.scales.y.title.text = "% of respondents";
    datasets.push({
      data: newValues,
      backgroundColor: backgroundColors,
    });
  } else {
    const total = values.reduce((partialSum, v) => partialSum + v, 0);

    barOptions.scales.x.stacked = false;
    barOptions.scales.y.stacked = false;
    barOptions.scales.y.title.text = "% of respondents";
    barOptions.plugins.legend.display = false;
    barOptions.plugins.tooltip.callbacks.label = (context) => {
      let label = context.dataset.label || "";

      if (label) {
        label += ": ";
      }
      if (context.parsed.y !== null) {
        label += Math.round(context.parsed.y * 100) + "%";
      }
      return label;
    };

    // TODO: Bring this back later
    // barOptions.plugins.tooltip.callbacks.afterLabel = (context) => {
    //   const denominator = total.toFixed(2);
    //   const numerator = values[context.dataIndex].toFixed(2);
    //   return `(  ${numerator} / ${denominator} )`;
    // };

    datasets.push({
      data: values.map((v) => v / total),
      backgroundColor: backgroundColors,
    });
  }

  const chartData = {
    labels,
    datasets,
  };

  const ChartComponent =
    type === "main" && subType !== "multi" ? Doughnut : Bar;
  const chartOptions =
    type === "main" && subType !== "multi" ? donutOptions : barOptions;

  return <ChartComponent options={chartOptions} data={chartData} />;
}

export default Chart;
