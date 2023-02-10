import { useState, useEffect } from "react";
import styled from "styled-components";
import { RouterProvider } from "react-router-dom";

import "./App.css";

import router from "./pages";

import { sendAmplitudeEvent } from "./utils/amplitude";

function App() {
  const [showMethods, setShowMethods] = useState(false);
  const [showDemographics, setShowDemographics] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    sendAmplitudeEvent("App Loaded");
  });

  return (
    <Main>
      <TopRow>
        <a href="https://ourcare.ca">
          <OCLogo src={require("./assets/ourcare-logo.png")} />
        </a>
        <P1>Survey Data Explorer</P1>
      </TopRow>

      <Col>
        <P2>
          OurCare is a pan-Canadian project to gather input from the public on
          how to rethink the future of primary care–the type of care usually
          delivered by family doctors and nurse practitioners (NPs). The survey
          was online from September 20th to October 25th, 2022. Over 9000 people
          in Canada completed the full survey, sharing their perspectives and
          experience. You can view the data below.
        </P2>
        {/* <P3>How to use this tool?</P3> */}

        <BottomItemToggle onClick={() => setShowHowItWorks(!showHowItWorks)}>
          {showHowItWorks ? "Close" : "Click here to learn about"} how to use
          this tool
        </BottomItemToggle>

        {showHowItWorks && (
          <>
            <BottomItemText>
              Start by selecting one of the tabs at the top ("All questions",
              "Those with a family doctor or NP", etc.). Then you can select
              specific questions within each section. The selected question will
              be the first chart you see. Below that you will see a set of
              graphs that show how different groups of people responded to the
              same question.
            </BottomItemText>
            <BottomItemText>
              Move your cursor over the graph to see the exact percentages.
              {/* as well as the total number who selected that response. */}
            </BottomItemText>
            {/* TODO: Bring this back later if need be */}
            <BottomItemText>
              In this tool, we present weighted data. Weighting helps ensure the
              data presented reflect a pool of respondents who roughly match the
              demographics of people living in Canada. You can see the breakdown
              of who responded before and after weighting using the last two
              tabs.
            </BottomItemText>
            <BottomItemText>
              The “N” in the title of the first graph provides the total number
              of respondents to the question before weighting was applied. When
              weighting is used, the effective sample size is lower.
            </BottomItemText>

            <br />
            <hr />
          </>
        )}
      </Col>

      <Container>
        <RouterProvider router={router} />
      </Container>

      <Col>
        <BtmAcknowledgementText>
          The OurCare project is led by Dr. Tara Kiran at MAP Centre for Urban
          Health Solutions, Unity Health Toronto. Learn more at{" "}
          <a href="https://ourcare.ca">OurCare.ca</a>.
        </BtmAcknowledgementText>

        <BottomItemToggle onClick={() => setShowMethods(!showMethods)}>
          {showMethods ? "Close" : "Click here to read about"} Survey Methods
        </BottomItemToggle>

        {showMethods && (
          <>
            <BottomItemText>
              The OurCare survey was conducted in partnership with VoxPop Labs.
              The survey,available in English and French, was distributed in two
              ways. An anonymous link was distributed widely and promoted
              through our partner networks, traditional media and social media.
              In addition, <a href="https://voxpoplabs.com/">VoxPop Labs</a>{" "}
              sent a unique link to 63552 people who are part of their panel and
              followed up with two personalized reminders.
            </BottomItemText>
            <BottomItemText>
              Survey responses from the two links were combined and weighted via
              iterative proportional fitting (raking) according to latest
              Statistics Canada Census estimates. Weighting helps ensure the
              data presented reflect a pool of respondents who roughly match the
              demographics of people living in Canada. We used the following
              attributes for weighting: age, gender, education, income, language
              and region. We analyzed data only for completed surveys (i.e.
              respondents reached the end of the survey; respondents may have
              skipped questions but needed to provide usable responses to the
              demographic questions used for weighting).
            </BottomItemText>
            <BottomItemText>
              We received 7213 responses from the VoxPop Labs panel with 5969
              completed surveys. We received 6805 responses from the anonymous
              link with 3310 completed surveys. In total, we analyzed data for
              9279 completed responses, 73% in English and 27% in French.
            </BottomItemText>
            <br />
            <hr />
          </>
        )}

        <BottomItemToggle
          onClick={() => setShowDemographics(!showDemographics)}
        >
          {showDemographics ? "Close" : ""} Demographic definitions
        </BottomItemToggle>

        {showDemographics && (
          <>
            <BottomItemText>
              <b>Gender</b>
            </BottomItemText>
            <BottomItemText>
              “Diverse” is inclusive of the following options: Transgender
              woman, Transgender man, Non-binary, and Two-spirit.
            </BottomItemText>

            <BottomItemText>
              <b>Income</b>
            </BottomItemText>
            <BottomItemText>
              Income inquired about the respondent’s personal income, not family
              or household income.
            </BottomItemText>

            <BottomItemText>
              <b>Region</b>
            </BottomItemText>
            <BottomItemText>
              “Prairies” denotes Manitoba, Saskatchewan, and Alberta. “Atlantic”
              denotes Newfoundland and Labrador, Nova Scotia, Prince Edward
              Island, and New Brunswick. We did not have any complete survey
              respondents from residents in the Territories.
            </BottomItemText>

            <BottomItemText>
              <b>Race</b>
            </BottomItemText>
            <BottomItemText>
              “Racialized” denotes any selection other than “White (European
              descent).” “Non-racialized” is exclusively those who selected
              “White (European descent).”
            </BottomItemText>

            <BottomItemText>
              <b>Rurality</b>
            </BottomItemText>
            <BottomItemText>Rurality is self-reported.</BottomItemText>

            <BottomItemText>
              <b>Has some additional health benefits</b>
            </BottomItemText>
            <BottomItemText>
              Respondents were counted as “Yes” if they reported having even
              partial insurance coverage or benefits. This included private
              insurance, Non-Insured Health Benefits, or other health benefits
              (eg. from social assistance) that paid for prescription
              medications, psychotherapy, other health professional services
              (e.g. physiotherapy) or dental care.
            </BottomItemText>
            <br />
            <hr />
          </>
        )}

        <BottomItemText>
          You can view the full survey that respondents took in{" "}
          <a
            href="https://drive.google.com/file/d/1TgKTQE18gBpbdZ-AD72JDYD_yUVVOZmj/view?usp=sharing"
            target="_blank"
          >
            English
          </a>{" "}
          or{" "}
          <a
            href="https://drive.google.com/file/d/1BNmXPEyZHWq6VE0vUdOTVmv1Gc4CgB13/view?usp=sharing"
            target="_blank"
          >
            French
          </a>
          .
        </BottomItemText>
      </Col>
    </Main>
  );
}

export default App;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  max-width: 996px;
  background-color: #a9a0ff;
  padding: 20px;
  border-radius: 5px;
`;

const Main = styled.div`
  background-color: #6658fb;
  min-height: 100vh;
  width: 100%;
  padding-bottom: 30px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  max-width: 996px;
  padding-top: 40px;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const OCLogo = styled.img`
  width: 200px;
`;

const P1 = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: white;

  @media (max-width: 600px) {
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;
  }
`;

const Col = styled.div`
  width: 80%;
  margin: 0 auto;
  max-width: 996px;
  margin-bottom: 40px;
`;

const P2 = styled.p`
  font-size: 17px;
  color: white;
  margin-bottom: 20px;
`;

const P3 = styled.p`
  font-size: 14px;
  color: white;
  text-decoration: underline;
`;

const BtmAcknowledgementText = styled.p`
  font-size: 20px;
  color: white;
  margin-top: 20px;

  a {
    text-decoration: underline;
  }
`;

const BottomItemToggle = styled.p`
  margin-top: 30px;
  font-size: 20px;
  color: white;
  text-decoration: underline;
  cursor: pointer;
`;

const BottomItemText = styled.p`
  font-size: 17px;
  color: white;
  margin-top: 20px;

  a {
    text-decoration: underline;
  }
`;
