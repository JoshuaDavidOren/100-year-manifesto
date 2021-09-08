import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminEdits from '../AdminEdits/AdminEdits';


const chips = [
  'Acceptance',
  'Accomplishment',
  'Accountability',
  'Accuracy',
  'Achievement',
  'Adaptability',
  'Alertness',
  'Altruism',
  'Ambition',
  'Amusement',
  'Assertiveness',
  'Attentive',
  'Awareness',
  'Balance',
  'Beauty',
  'Boldness',
  'Bravery',
  'Brilliance',
  'Calm',
  'Candor',
  'Capable',
  'Careful',
  'Certainty',
  'Challenge',
  'Charity',
  'Cleanliness',
  'Clear',
  'Clever',
  'Comfort',
  'Commitment',
  'Common Sense',
  'Communication',
  'Community',
  'Compassion',
  'Competence',
  'Concentration',
  'Confidence',
  'Connection',
  'Consciousness',
  'Consistency',
  'Contentment',
  'Contribution',
  'Control',
  'Conviction',
  'Cooperation',
  'Courage',
  'Courtesy',
  'Creation',
  'Creativity',
  'Credibility',
  'Curiosity',
  'Creation',
  'Creativity',
  'Credibility',
  'Curiosity',
  'Decisive',
  'Decisiveness',
  'Dedication',
  'Dependability',
  'Determination',
  'Development',
  'Devotion',
  'Dignity',
  'Discipline',
  'Discovery',
  'Drive',
  'Effectiveness',
  'Efficiency',
  'Empathy',
  'Empower',
  'Endurance',
  'Energy',
  'Enjoyment',
  'Enthusiasm',
  'Equity',
  'Ethical',
  'Excellence',
  'Experience',
  'Exploration',
  'Expressive',
  'Fairness',
  'Family',
  'Famous',
  'Fearless',
  'Feelings',
  'Ferocious',
  'Fidelity',
  'Focus',
  'Foresight',
  'Fortitude',
  'Freedom',
  'Friendship',
  'Fun',
  'Generosity',
  'Genius',
  'Giving',
  'Goodness',
  'Grace',
  'Gratitude',
  'Greatness',
  'Growth',
  'Happiness',
  'Hard work',
  'Harmony',
  'Health',
  'Honesty',
  'Honor',
  'Hope',
  'Humility',
  'Imagination',
  'Improvement',
  'Independence',
  'Individuality',
  'Innovation',
  'Inquisitive',
  'Insightful',
  'Inspiring',
  'Integrity',
  'Intelligence',
  'Intensity',
  'Intuitive',
  'Irreverent',
  'Joy',
  'Justice',
  'Kindness',
  'Knowledge',
  'Lawful',
  'Leadership',
  'Learning',
  'Liberty',
  'Logic',
  'Love',
  'Loyalty',
  'Mastery',
  'Maturity',
  'Meaning',
  'Moderation',
  'Motivation',
  'Openness',
  'Optimism',
  'Order',
  'Organization',
  'Originality',
  'Passion',
  'Patience',
  'Peace',
  'Performance',
  'Persistence',
  'Playfulness',
  'Poise',
  'Potential',
  'Power',
  'Present',
  'Productivity',
  'Professionalism',
  'Prosperity',
  'Purpose',
  'Quality',
  'Realistic',
  'Reason',
  'Recognition',
  'Recreation',
  'Reflective',
  'Respect',
  'Responsibility',
  'Restraint',
  'Results-oriented',
  'Rigor',
  'Risk',
  'Satisfaction',
  'Security',
  'Self-reliance',
  'Selfless',
  'Sensitivity',
  'Serenity',
  'Service',
  'Sharing',
  'Significance',
  'Silence',
  'Simplicity',
  'Sincerity',
  'Skill',
  'Skillfulness',
  'Smart',
  'Solitude',
  'Spirit',
  'Spirituality',
  'Spontaneous',
  'Stability',
  'Status',
  'Stewardship',
  'Strength',
  'Structure',
  'Success',
  'Support',
  'Surprise',
  'Sustainability',
  'Talent',
  'Teamwork',
  'Temperance',
  'Thankful',
  'Thorough',
  'Thoughtful',
  'Timeliness',
  'Tolerance',
  'Toughness',
  'Traditional',
  'Tranquility',
  'Transparency',
  'Trust',
  'Trustworthy',
  'Truth',
  'Understanding',
  'Uniqueness',
  'Unity',
  'Valor',
  'Victory',
  'Vigor',
  'Vision',
  'Vitality',
  'Wealth',
  'Welcoming',
  'Winning',
  'Wisdom',
  'Wonder',
];

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'
function AboutPage() {
  const dispatch = useDispatch ();
  const coreValues = useSelector((store) => store.coreValuesReducer.coreValues);
  const page_id = 9;
  
  // component is not listed in the progress bar
  dispatch({ type: "SET_NEXT_BUTTON", payload: -1 });

  useEffect(() => {
      dispatch({ type: 'FETCH_USER' });
      dispatch({ type: 'FETCH_PAGE_EDITS', payload: {page_id: page_id} });
  }, []);

  const deleteCoreValue = (id) => {
    dispatch({
        type: 'DELETE_CORE_VALUE', 
        payload: id
    });
  };

  const addCoreValue = (manifestoText) => {
    dispatch({
        type: 'ADD_CORE_VALUE', 
        payload: {
            manifestoText: manifestoText
        }});
  };

  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
        <p><AdminEdits page_id={page_id} html_id={"about_text"} default_value={"This about page is for anyone to read!"}/></p>
        <AdminEdits page_id={page_id} html_id={"chipsArray"} html_type={'array'} default_value={chips} current_selection={coreValues} handleAddFunction={addCoreValue} handleDeleteFunction={deleteCoreValue}/>
      </div>
    </div>
  );
}

export default AboutPage;