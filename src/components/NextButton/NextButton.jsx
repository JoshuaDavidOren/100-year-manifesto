import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 36,
    padding: "0 30px",
    marginLeft: 2,
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Intro: Your 100 Year Manifesto",
    "Mission Statement",
    "Words to Live By",
    "Core Values",
    "For Good",
    "Life Goals",
    "Guiding Principles",
    "Next Step",
  ];
}

function NextButton() {
  const classes = useStyles();
  const activeStep = useSelector((store) => store.nextButtonReducer.nextButton);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();
  const dispatch = useDispatch();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    dispatch({ type: "SET_NEXT_BUTTON", payload: newActiveStep });
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        className={classes.button}
      >
        Next
      </Button>
    </div>
  );
}

export default NextButton;
