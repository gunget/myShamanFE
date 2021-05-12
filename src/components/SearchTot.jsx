import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchStep1 from "./SearchStep1";
import SearchStep2 from "./SearchStep2";
import SearchStepFinish from "./SearchStepFinish";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
    marginLeft: "44%",
  },
  resetButton: {
    marginLeft: "44%",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["네이버 검색", "옵션선택 및 저장"];
}

function getStepContent([stepIndex, fetchTotalInfo, sectionType, handleNext]) {
  switch (stepIndex) {
    case 0:
      return <SearchStep1 sectionType={sectionType} />;
    case 1:
      return (
        <SearchStep2
          sectionType={sectionType}
          fetchTotalInfo={fetchTotalInfo}
          handleNext={handleNext}
        />
      );
    default:
      return "Unknown stepIndex";
  }
}

export default function HorizontalLabelPositionBelowStepper({
  fetchTotalInfo,
  sectionType,
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <SearchStepFinish />
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "46%" }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent([
                activeStep,
                fetchTotalInfo,
                sectionType,
                handleNext,
              ])}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
