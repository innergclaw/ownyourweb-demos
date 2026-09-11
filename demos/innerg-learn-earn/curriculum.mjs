export const pathways = [
  {id:'money', name:'Money', description:'Understand the numbers behind everyday choices.', code:'01'},
  {id:'technology', name:'AI + technology', description:'Use the tools. Keep your own judgment.', code:'02'},
  {id:'communication', name:'Communication', description:'Make your meaning clear to someone else.', code:'03'},
  {id:'business', name:'Business', description:'Start with a problem you can help solve.', code:'04'}
];
export const missions = [
  {id:'inflation',path:'money',title:'Why does money lose buying power?',short:'The same dollar. A different value.',time:5,points:50,
    lesson:'Inflation is a rise in prices across an economy over time. When prices rise, the same amount of money buys less. One item becoming more expensive alone does not establish economy-wide inflation.',
    example:'Imagine a basket of everyday goods costs $10 one year and $12 the next. With the same $10, you cannot buy the whole basket anymore.',
    prompt:'Explain buying power to a friend. Use a different example from the lesson.',hint:'Compare what the same amount of money could buy before and after prices change.',
    proof:'A basket costs $20 today and $25 later. Your budget stays $20. What changed?',options:['Your money buys more.','Your money buys less.','Your budget automatically rises.'],correct:1,proofHint:'Hold the budget at $20. Could you still buy the whole basket?'},
  {id:'verify-ai',path:'technology',title:'Would you trust that AI answer?',short:'A confident answer is not proof.',time:4,points:50,
    lesson:'AI tools can produce useful explanations and still make mistakes. Fluent writing is not evidence. Check an important claim against a reliable original source before you use it.',
    example:'An AI gives you a quote from a book. Before using it in a project, find the passage in the actual book. If you cannot verify it, do not present it as an exact quote.',
    prompt:'Describe a claim you would check before sharing. Explain how you would check it.',hint:'Name the original source you would look for, and what you would compare.',
    proof:'An AI gives you an event date without a source. What is the best next step?',options:['Share it because it sounds certain.','Ask the same question until you like the answer.','Check the organizer’s official announcement.'],correct:2,proofHint:'Who is responsible for announcing the event date?'},
  {id:'clear-request',path:'communication',title:'Can someone act on your message?',short:'Say what you need. Make it usable.',time:4,points:50,
    lesson:'A useful request names the action, gives enough context, and explains when a response is needed. Clear communication helps the other person respond without guessing.',
    example:'Instead of “Help with this,” try “Can you read my two-paragraph introduction and tell me if the main idea is clear by Thursday?”',
    prompt:'Write a clear request for help with a project. Include the action and timing.',hint:'What should the person do? What information do they need? When do you need their help?',
    proof:'Which request gives the other person enough information to respond?',options:['Please check this sometime.','Can you review the title of my poster before Friday?','You know what I need.'],correct:1,proofHint:'Look for a specific action, an item to review, and a time.'},
  {id:'solve-first',path:'business',title:'What problem are you solving?',short:'Useful work starts with listening.',time:5,points:50,
    lesson:'A service starts with a real problem someone needs help with. Talk to the people who have that problem. Test a small, useful solution before spending a lot of time building something bigger.',
    example:'A local club struggles to share its event schedule. You could first help organize one clear weekly update and ask whether it made planning easier.',
    prompt:'Name a problem you have noticed. Who has it, and what small service could help?',hint:'Describe the person, their difficulty, and one small thing you could do. Avoid sharing anyone’s private details.',
    proof:'You have a new service idea. What should you do first?',options:['Build a large app before talking to anyone.','Promise that everyone will buy it.','Talk to people with the problem and test a small solution.'],correct:2,proofHint:'Which option helps you learn whether the idea is useful?'}
];
