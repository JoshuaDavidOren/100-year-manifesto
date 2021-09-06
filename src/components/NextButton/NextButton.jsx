import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
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
    "Mantras",
    "Core Values",
    "For Good",
    "Life Goals",
    "Next Step",
  ];
}

function NextButton() {
  const classes = useStyles();
  const activeStep = useSelector((store) => store.nextButtonReducer.nextButton);
  // const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();
  const dispatch = useDispatch();

  const totalSteps = () => {
    return steps.length;
  };

//   const completedSteps = () => {
//     return Object.keys(completed).length;
//   };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

//   const allStepsCompleted = () => {
//     return completedSteps() === totalSteps();
//   };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    dispatch({ type: "SET_NEXT_BUTTON", payload: newActiveStep });
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  //I think this is where we can put some logic to push user to the page they want to be onClick
  // const handleStep = (step) => () => {
  //   setActiveStep(step);
  // //   getStepContent(step);
  // };

  // const handleComplete = () => {
  //   const newCompleted = completed;
  //   newCompleted[activeStep] = true;
  //   setCompleted(newCompleted);
  //   handleNext();
  // };

//   const handleReset = () => {
//     setActiveStep(0);
//     setCompleted({});
//   };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        // onClick={() => handleNext()}
        className={classes.button}
      >
        Next
      </Button>
    </div>
  );
}

export default NextButton;

//Working code for Next button.
// return (
//     <div className={classes.root}>
//       {allStepsCompleted() ? (
//         <div>
//           <Typography className={classes.instructions}>
//             All steps completed - you&apos;re finished
//           </Typography>
//           <Button onClick={handleReset}>Reset</Button>
//         </div>
//       ) : (
//         // <div>
//         //   <Typography className={classes.instructions}>
//         //     {getStepContent(activeStep)}
//         //   </Typography>
//           <div>
//             {/* <Button
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               className={classes.button}
//             >
//               Back
//             </Button> */}
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleNext}
//                 // onClick={() => handleNext()}
//               className={classes.button}
//             >
//               Next
//             </Button>
//             {/* {activeStep !== steps.length &&
//               (completed[activeStep] ? (
//                 <Typography variant="caption" className={classes.completed}>
//                   Step {activeStep + 1} already completed
//                 </Typography>
//               ) : (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleComplete}
//                 >
//                   {completedSteps() === totalSteps() - 1
//                     ? "Finish"
//                     : "Complete Step"}
//                 </Button>
//               ))} */}
//           </div>
//         // </div>
//       )}
//     </div>
// );
