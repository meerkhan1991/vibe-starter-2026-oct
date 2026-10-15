import { Article, CommentItem } from '../types';

export const ARTICLES: Record<string, Article> = {
  'lead-trump-women': {
    id: 'lead-trump-women',
    section: 'U.S. Politics',
    kicker: 'WHITE HOUSE EXODUS',
    title: 'High-Ranking Women Are Leaving the Trump Administration',
    summary: 'In the president’s second term, those heading for the exits are female officials.',
    readTime: '5 MIN READ',
    publishedAt: 'Oct. 14, 2026',
    byline: 'By Maggie Haberman, Jonathan Swan and Katie Rogers',
    photographer: 'Tierney L. Cross/The New York Times',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    commentCount: 842,
    bodyParagraphs: [
      'WASHINGTON — A wave of high-profile departures in recent weeks has highlighted a stark pattern within the upper ranks of the administration: female officials across cabinet-level agencies and senior West Wing posts are stepping down in disproportionate numbers.',
      'According to administration officials familiar with internal discussions, the exits reflect a mixture of burnout, shifting internal power dynamics, and mounting policy clashes over civil service restructuring and executive branch loyalty pledges.',
      'The departures have quietly unsettled traditional Republican allies in the Senate, who had viewed several of the departing officials as pragmatic bulwarks against more radical bureaucratic revamps.',
      '“There is an unmistakable narrowing of voices at the top table,” said one former senior administration official who left earlier this autumn. “What began as isolated personnel disputes has evolved into a systematic attrition of senior women leaders.”',
      'The White House pushed back firmly against suggestions of a pattern, noting that cabinet reshuffles are common at this phase of any second presidential term. A spokeswoman pointed to several recent appointments and described the administration’s leadership team as unified and focused on executing the agenda.',
      'Nonetheless, historians and political scientists note that retention rates among women in senior advisory roles during this administration remain well below those of previous modern presidencies of both parties.'
    ],
    keyTakeaways: [
      'At least seven senior female officials in West Wing advisory and deputy cabinet positions have announced departures in the past four months.',
      'Allies in Congress express concern over the loss of institutional memory and policy continuity ahead of key budgetary deadlines.',
      'The White House maintains that turnover is customary midway through an administration’s tenure and rejects characterizations of internal discord.'
    ],
    tags: ['Donald Trump', 'White House', 'U.S. Politics', 'Cabinet Appointments', 'Washington']
  },
  'guilfoyle': {
    id: 'guilfoyle',
    section: 'Politics',
    kicker: 'POLITICAL CURRENTS',
    title: 'The Steep Rise and Sudden Fall of Kimberly Guilfoyle',
    summary: 'Once a ubiquitous presence in the MAGA constellation, the former prosecutor and television host has found herself increasingly sidelined.',
    readTime: '6 MIN READ',
    publishedAt: 'Oct. 14, 2026',
    byline: 'By Michael Bender and Shane Goldmacher',
    photographer: 'Damon Winter/The New York Times',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    commentCount: 519,
    bodyParagraphs: [
      'For nearly a decade, Kimberly Guilfoyle occupied a unique perch at the intersection of conservative media, political fundraising, and Donald Trump’s inner circle.',
      'Her thunderous speeches at party conventions and relentless fundraising across the country made her one of the most recognizable figures in national Republican politics.',
      'Yet over the past six months, according to interviews with more than a dozen campaign operatives and family confidants, Ms. Guilfoyle’s influence has waned noticeably amidst a reshuffling of presidential priorities and donor operations.',
      'Where once she was granted prime speaking slots and direct oversight of high-dollar donor dinners, she has been noticeably absent from recent marquee campaign events in swing states.'
    ],
    tags: ['Kimberly Guilfoyle', 'Elections', 'Republican Party']
  },
  'press-secretary': {
    id: 'press-secretary',
    section: 'White House',
    kicker: 'MEDIA & LAW',
    title: 'Trump’s New Press Secretary: Not-Quite Attorney at Law',
    summary: 'Katie Zacharia told The New York Times that the confusion over her legal credentials is the result of one big misunderstanding.',
    readTime: '4 MIN READ',
    publishedAt: 'Oct. 14, 2026',
    byline: 'By Peter Baker and Ken Bensinger',
    photographer: 'Doug Mills/The New York Times',
    image: 'https://images.unsplash.com/photo-1541872705007-88544a04870c?auto=format&fit=crop&w=1200&q=80',
    commentCount: 312,
    bodyParagraphs: [
      'WASHINGTON — When the newly appointed White House press secretary, Katie Zacharia, was introduced to reporters last week, her bio prominently listed her status as a constitutional lawyer and former trial attorney.',
      'However, state bar records reviewed by The Times revealed that while Ms. Zacharia graduated from an accredited law school, she never completed formal admission to the state bar in either jurisdiction where she previously practiced corporate consulting.',
      'In an exclusive interview on Tuesday, Ms. Zacharia clarified: “I was clear that my background was in regulatory compliance and legal research; any suggestion that I claimed active courtroom bar standing was an inadvertent drafting oversight by transition staff.”',
      'The episode has drawn barbs from Capitol Hill oversight committees, even as the administration dismissed the flap as typical beltway pedantry.'
    ],
    tags: ['White House Press Corps', 'Ethics', 'Legal Affairs']
  },
  'ukraine-satellite': {
    id: 'ukraine-satellite',
    section: 'World',
    kicker: 'RUSSIA-UKRAINE WAR',
    title: 'Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates',
    summary: 'A huge attack cut power to 600,000 people in Kyiv, and a Pentagon-funded satellite internet program appeared to be curbed without warning.',
    readTime: '7 MIN READ',
    publishedAt: 'Oct. 14, 2026',
    byline: 'By Andrew E. Kramer and Eric Schmitt',
    photographer: 'Finbarr O’Reilly/The New York Times',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    commentCount: 1100,
    bodyParagraphs: [
      'KYIV, Ukraine — Ukrainian front-line commanders faced sudden operational disruptions on Wednesday after commercial satellite uplink capacity contracted sharply along the eastern perimeter, coinciding with Russia’s heaviest missile salvo against national energy grids in months.',
      'Over 600,000 residents in Kyiv and surrounding districts were plunged into darkness as subzero temperatures approached. Repair crews labored under air raid sirens to restore emergency transformers.',
      'Military analysts warn that satellite connectivity has become the nervous system of modern Ukrainian battlefield defense, coordinating artillery strikes, drone surveillance, and civilian casualty alarms.',
      '“Without synchronized satellite links, battery response times drop by half,” said Col. Oleksandr Pavliuk. “Every hour of disrupted communication exacts a direct price on territorial stability.”',
      'In Washington, defense officials scrambled to determine whether the curtailment resulted from contractual renewal friction, electronic countermeasures, or policy reassessments.'
    ],
    tags: ['Ukraine', 'Russia', 'War in Ukraine', 'Satellites', 'NATO']
  },
  'diesel-deal': {
    id: 'diesel-deal',
    section: 'Business & Economy',
    kicker: 'ENERGY MARKETS',
    title: 'Why Trump’s Diesel Deal With Putin Won’t Knock Down High Prices',
    summary: 'Global refinery bottlenecks, shipping insurance hurdles and market pricing mechanisms mean crude swaps do little for pump relief.',
    readTime: '4 MIN READ',
    publishedAt: 'Oct. 14, 2026',
    byline: 'By Clifford Krauss and Stanley Reed',
    photographer: 'David Guttenfelder/The New York Times',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    commentCount: 420,
    bodyParagraphs: [
      'Despite bold claims of immediate consumer relief, energy economists overwhelmingly agree that the bilateral diesel import proposal will face severe legal and logistic headwinds.',
      'Refineries along the U.S. Gulf Coast are already configured for specific crude densities, and maritime insurers remain bound by existing international sanctions regimes.',
      'Wholesale diesel contracts in early trading barely registered the announcement, ticking down less than two cents before rebounding on broader supply constraints.'
    ],
    tags: ['Diesel', 'Energy', 'Inflation', 'Gas Prices']
  },
  'us-intelligence': {
    id: 'us-intelligence',
    section: 'National Security',
    kicker: 'INTELLIGENCE REPORT',
    title: 'The U.S. Continues to Provide Intelligence to Ukraine, Officials Say',
    summary: 'Despite recent public rhetoric, real-time targeting and early warning data feeds remain active between Washington and Kyiv.',
    readTime: '3 MIN READ',
    publishedAt: 'Oct. 14, 2026',
    byline: 'By Julian E. Barnes and Helene Cooper',
    photographer: 'Erin Schaff/The New York Times',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    commentCount: 289,
    bodyParagraphs: [
      'Behind closed doors, intelligence sharing between United States agencies and Ukrainian defense forces continues uninterrupted, according to three senior national security officials.',
      'The data stream includes radar early warnings for incoming ballistic missile trajectories, allowing civilian defense forces in major cities crucial minutes to seek shelter.',
      'Officials emphasized that while broad policy guidelines are under constant review, tactical defensive coordination remains robust.'
    ],
    tags: ['National Security', 'Pentagon', 'CIA', 'Ukraine']
  },
  'evening-briefing': {
    id: 'evening-briefing',
    section: 'The Evening',
    kicker: 'TODAY’S ESSENTIALS',
    title: 'Catch Up on Today’s Biggest Stories',
    summary: 'Energy prices lift inflation, Ukraine grows more vulnerable and the Texas Senate race tightens.',
    readTime: '5 MIN READ',
    publishedAt: 'Oct. 14, 2026',
    byline: 'By The New York Times Editorial Staff',
    photographer: 'The New York Times',
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80',
    commentCount: 175,
    bodyParagraphs: [
      'Good evening. Here’s the latest:',
      '• Rising diesel and home heating oil costs pushed the consumer price index up 0.4 percent in September, compounding consumer anxiety ahead of November voting.',
      '• Front-line satellite services in Ukraine saw unexpected throttling, leaving Kyiv vulnerable during a major power blackout impacting 600,000 residents.',
      '• In Texas, new statewide polling shows Democratic challenger James Talarico within two percentage points of the Republican incumbent, triggering last-minute national ad buys.',
      '• In sports, the Milwaukee Brewers jumped ahead in Game 3 of the NLCS with an explosive leadoff home run by Jackson Chourio.'
    ],
    tags: ['Evening Briefing', 'News Summary', 'Daily Digest']
  },
  'texas-senate': {
    id: 'texas-senate',
    section: 'Midterms 2026',
    kicker: 'BATTLEGROUND WATCH',
    title: 'Texas Senate Race Tightens, Polls Show, Even as Talarico Keeps His Edge',
    summary: 'A surge in suburban turnout and record early voting numbers have turned the Lone Star State into the premier battleground of the cycle.',
    readTime: '5 MIN READ',
    publishedAt: 'Oct. 14, 2026',
    byline: 'By Jonathan Weisman and Maya King',
    photographer: 'Tamir Kalifa/The New York Times',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
    commentCount: 934,
    bodyParagraphs: [
      'AUSTIN, Texas — With early voting underway across the state, public opinion polls show a neck-and-neck contest for the U.S. Senate that could decide the balance of power in Washington for the next two years.',
      'State Representative James Talarico, whose campaign has blended progressive economic messaging with appeals to moderate faith-based voters, holds a 48% to 46% edge in the latest Marist/Times survey.',
      'Campaign spending in the race has already shattered state records, exceeding $140 million between candidate committees and outside political action groups.',
      'Both parties have dispatched top surrogates to the Dallas-Fort Worth metroplex and suburban Houston, regions expected to determine the outcome.'
    ],
    tags: ['Texas', 'U.S. Senate', 'Midterm Elections', 'Polling']
  },
  'meatballs-recipe': {
    id: 'meatballs-recipe',
    section: 'NYT Cooking',
    kicker: 'WEEKDAY DINNER',
    title: 'Meatballs With Any Meat',
    summary: 'Whether you use ground beef, pork, turkey, lamb or plant-based mince, this versatile sheet-pan method guarantees tender, caramelized results every time.',
    readTime: '35 MINS TOTAL',
    publishedAt: 'Oct. 14, 2026',
    byline: 'By Melissa Clark',
    photographer: 'Christopher Testani for The New York Times',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1200&q=80',
    commentCount: 1420,
    bodyParagraphs: [
      'There is no dinner more comforting or forgiving than a platter of golden, savory meatballs simmered in a garlicky tomato sauce or piled over polenta.',
      'The secret to tenderness lies in the panade: fresh breadcrumbs soaked in whole milk or ricotta, which traps moisture even when using lean meats like ground turkey or chicken.',
      'Baking them at 425°F on a rimmed baking sheet gives you the caramelized edges of pan-frying without any of the stovetop splatter.'
    ],
    tags: ['Dinner', 'Italian-American', 'Comfort Food', 'Easy Meals']
  },
  'athletic-brewers': {
    id: 'athletic-brewers',
    section: 'The Athletic',
    kicker: 'NLCS GAME 3',
    title: 'Brewers Lead Dodgers in Game 3',
    summary: 'Jackson Chourio sparked American Family Field with a thunderous 430-foot leadoff blast, fueling an early 4-1 Milwaukee surge.',
    readTime: '4 MIN READ',
    publishedAt: 'Oct. 14, 2026',
    byline: 'By Ken Rosenthal and Will Sammon',
    photographer: 'Morry Gash/Associated Press',
    image: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1200&q=80',
    commentCount: 480,
    bodyParagraphs: [
      'MILWAUKEE — On the second pitch of the bottom of the first inning, Jackson Chourio turned on a 98-mph fastball and sent it crashing into the left-field concourse, igniting a sellout crowd of 43,000 in Milwaukee.',
      'The Brewers’ pitching staff capitalized on the momentum, striking out seven Los Angeles batters through the first five frames while keeping Shohei Ohtani hitless in three plate appearances.',
      '“We came out ready to set the tone from the jump,” Chourio said postgame. “In postseason baseball, whoever lands the first punch dictates the rhythm.”'
    ],
    tags: ['MLB', 'Baseball', 'Brewers', 'Dodgers', 'Postseason']
  }
};

export const INITIAL_COMMENTS: Record<string, CommentItem[]> = {
  'lead-trump-women': [
    {
      id: 'c1',
      author: 'Sarah Jenkins',
      location: 'Philadelphia, PA',
      timestamp: '2 hours ago',
      text: 'The loss of institutional knowledge across these key advisory committees is what worries me most. When senior civil servants and advisors leave all at once, continuity suffers.',
      likes: 142,
      isNytPick: true
    },
    {
      id: 'c2',
      author: 'David R.',
      location: 'Austin, TX',
      timestamp: '3 hours ago',
      text: 'Every administration undergoes restructuring midway through. While the reporting highlights notable names, cabinet turnover is hardly unprecedented in presidential history.',
      likes: 67
    },
    {
      id: 'c3',
      author: 'Dr. Helen Morris',
      location: 'Chicago, IL',
      timestamp: '4 hours ago',
      text: 'Excellent reporting by Maggie and Jonathan. The quotes from former officials speak volumes about the internal working environment and culture right now.',
      likes: 95
    }
  ],
  'ukraine-satellite': [
    {
      id: 'c4',
      author: 'Markus Lindholm',
      location: 'Stockholm, Sweden',
      timestamp: '1 hour ago',
      text: 'The dependence of modern defense systems on commercial satellite networks is a huge strategic vulnerability that European partners need to address immediately.',
      likes: 215,
      isNytPick: true
    },
    {
      id: 'c5',
      author: 'Elena V.',
      location: 'Kyiv, Ukraine',
      timestamp: '2 hours ago',
      text: 'Power is already being restored in parts of the central district thanks to heroic utility workers, but the winter ahead will be our toughest test yet.',
      likes: 410,
      isNytPick: true
    }
  ]
};
