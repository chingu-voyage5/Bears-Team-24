/* eslint-disable */
const Article = require('../backend/models/article');
const { Topic, SubTopic } = require('../backend/models/topic');

const seedVoyage = async sys_id => {
  const topic = new Topic({ name: "Voyage", order: 1 });
  try {
    await topic.save();
  } catch (e) {
    console.error('voyage topic save failed:', e);
    process.exit(1);
  }
  const about = new SubTopic({ parent: topic._id, name: "About this wiki", order: 1 });
  const voyage = new SubTopic({ parent: topic._id, name: "About Voyages", order: 2 });
  const setup = new SubTopic({ parent: topic._id, name: "Project Setup", order: 3 });
  const sprints = new SubTopic({ parent: topic._id, name: "Development Sprints", order: 4 });
  const closure = new SubTopic({ parent: topic._id, name: "Project Closure", order: 5 });
  const tools = new SubTopic({ parent: topic._id, name: "Tools and Resources", order: 6 });
  const faq = new SubTopic({ parent: topic._id, name: "Tools and Resources>FAQ", order: 7 });

  try {
    await about.save();
    await voyage.save();
    await setup.save();
    await sprints.save();
    await closure.save();
    await tools.save();
    await faq.save();
  } catch (e) {
    console.error('Voygae save failed:', e);
    process.exit(1);
  }

  await Article.create([
    // { creator: "1", topic: "", sub_topic: "", content: "" },
    { creator: sys_id, topic: topic._id, sub_topic: about._id, title: 'Home',
      order: 1,
      content: `## About this Wiki
This wiki is intended to provide Voyage teams with a reference defining what to expect from the current Voyage, how to get started, and how to deal with problems that may arise during your journey. This is a ["living document"](https://en.wikipedia.org/wiki/Living_document) that will improve from Voyage-to-Voyage based on your experiences and feedback. Both positive and negative.

To make a suggestion, request, or to report a correction simply open an [issue](https://github.com/Chingu-cohorts/voyage-wiki/issues) in this wiki repo.

# Good luck, Clear Skies, and Smooth Sailing!
      ` },
    { creator: sys_id, topic: topic._id, sub_topic: about._id, title: 'How to Contribute',
      order: 2,
      content: `## Why Contribute?

Keeping the information and advice in the Voyage Wiki up to date is important not only
for the Voyage that's currently in progress, but also for future Voyages.
Not only does contributing help build the repository knowledge for those who
will follow you, but doing so will also help you to improve and
extend your skills.

## How to Contribute

Making corrections or adding content follows a process very
similar to the one you use when making contributions to your Voyage projects.
GitHub Wikis are implemented in a manner that doesn't allow changes to be
approved and merged using the Pull Request (PR) mechanism available to normal
repos.

Due to this a "mirror" repo has been created that you will use to make changes
just like you do in a normal project repo. TravisCI integration has been set
up in the mirror to automatically push changes from the \`master\` branch once
a PR for a change has been reviewed, approved, and merged from \`development\`
into \`master\`.

This architecture was adapted from this [article](http://www.growingwiththeweb.com/2016/07/enabling-pull-requests-on-github-wikis.html)
and the following diagram depicts the change management flow for PMRoK.

![Voyage Wiki Change Management Workflow](https://github.com/Chingu-cohorts/voyage-wiki/blob/development/images/Voyage%20Wiki%20Change%20Mgt%20Workflow.png)

### First Time Local Repo Setup
Start by cloning the "mirror" repo, [voyage-wiki-chgmgt](https://github.com/Chingu-cohorts/voyage-wiki-chgmgt),
your computer. By default the \`development\` branch will be cloned onto your computer.

### Refreshing the Local Repo
If you have previously cloned the "mirror" repo you should *_always_* refresh it from the Voyage Wiki, not the "mirror" repo. This will ensure that you start with all of the changes made by both you and others. To do a refresh:
1. Make sure that you have defined an 'upstream' remote in your local repo using the command:
   \`git remote add upstream https://github.com/Chingu-cohorts/voyage-wiki.wiki.git\`
2. If you are unsure if you have defined this remote you can display all remotes in your local repo using the command:
   \`git remote -v\`
3. To pull changes from the Voyage Wiki to your local "mirror" repo use the command:<br>
   \`git pull upstream <your-branch-name>\` (see #1 in _Making a Change_ below).

### Making a Change
1. Create a new working branch with a descriptive name. For example, \`fix/softskill-url\`. Any changes or additions to make should be made to this working branch.
2. Refresh the repo with the latest version of upstream/master as described above.
3. Make your changes. Remember to issue frequent commits if you are making multiple changes so there is a detailed trail of each change you've made.
3. When you are ready to share with others or if you just need to ensure that your in progress work
is backed up push your changes to the \`voyage-wiki-chgmt\` repo using the same working branch name. For
example, \`git push origin fix/softskill-url\`.
4. If you should need to refresh your working branch from GitHub simply
\`git pull origin <working-branch>\`.
5. When your changes are completed you can start the process of promoting them to the wiki by
creating a PR to merge your changes into the \`development\` branch. Be sure to select \`PMCAB\` as
the reviewer and once changes have been reviewed and approved you will be responsible for
performing the merge.
6. Once your change has been merged into the \`development\` branch it will be ready to merge into
the \`master\` branch along with changes submitted by others. A member of the _PMRoK Change Approval
Board (PMCAB)_ will periodically create a PR to promote all changes from \`development\` to \`master\`.
7. Merging into \`master\` by a member of the PMCAB will automatically start the TravisCI integration
script to move changes to the Voyage Wiki.
8. Once the TravisCI integration script has completed the approved changes will be available to
all users of the Voyage Wiki.

If you are curious about the _Change Approval Board_ process it is a concept that's part of the
[Information Technology Infrastructure Library](https://en.wikipedia.org/wiki/ITIL), which is a
set of best practices for managing IT infrastructure assets.

      ` },
    { creator: sys_id, topic: topic._id, sub_topic: voyage._id, title: 'About Voyages',
      order: 1,
      content: `## About Chingu Voyages
Chingu Voyages are an exciting way to work on projects that provide the opportunity to:

- Work on interesting and challenging projects
- Learn new technologies
- Work with a team of like-minded WebDevs
- Improve soft skills including communication, collaboration, and Agile project management
- Create impact while leveling-up your skills

In short, Chingu Voyages create a setting to help you both acquire and practice the skills you will need on the job.

## Voyage Tiers

Maximizing the Voyage experience requires that it be tailored to start at an individuals current level of experience, but end up at a higher level. The overall goal of the Voyage is to give everyone the opportunity to step up to a higher level of knowledge and experience.

To achieve this participants are divided into one of three tiers based on their knowledge and experience at the start of the Voyage.

| Tier | Starting Point         | Example Voyage Projects                             |
|:----:|:-----------------------|:----------------------------------------------------|
|   1  | Tier-1 teams are at the html to early javascript phase of their learning journey | 1. Clone a landing page! <br> 2. Don’t clone, create a landing page for your own idea! <br> 3. Advanced Tier-1s — Clone the basic functionality of Momentum |
|   2  | Tier-2 members are around the intermediate projects area | 1. Clone Trello or build a Chrome Extension <br> 2. Build something completely new! <br> 3. Find a nonprofit and build something for them. |
|   3  | Tier-3 members are between the Advanced projects and <br> backend. For Tier-3, there is more room for flexibility <br> with choosing projects, as people here often have already <br> finished a Voyage Build-to-Learn project before and they <br> can confidently lead a team to success. | 1. Build a full-stack application, aim to create value and/or impact <br> 2. Build a bot <br> 3. Find a nonprofit and build something for them. |

For more details and examples check out [Chingu Voyage-4 Team Projects Lineup](https://medium.com/chingu/chingu-voyage-4-team-projects-lineup-320a8bc87701)
      `},
    { creator: sys_id, topic: topic._id, sub_topic: voyage._id, title: 'Voyage Roadmap',
      order: 2,
      content: `## Roadmap Overview

At Chingu, we build to learn. Below is the project roadmap for teams:
![Voyage Roadmap Diagram](https://github.com/Chingu-cohorts/voyage-wiki/blob/development/images/Voyage%20Roadmap%20Diagram.png)

| Sprint | Role | Provided to you            | Your Responsibility             |
|:-------|:-----|:---------------------------|:--------------------------------|
| -1 & 0 | PM   | Slack invitation email     | Read, click on link, and follow instructions to activate Slack account |
|        | PM   |                            | Write your intro in #intro-stories |
|        | PM   |                            | Meet other PM's                 |
|        | PM   | Guidance in #chingu-news & PMRoK Wiki | Review provided info, ask questions, and discuss with your peers |
|   1    | Team | Slack invitation email     | Read, click on link, and follow instructions to activate Slack account |
|        | Team |                            | Write your intro in #intro-stories |
|        | Team |                            | Meet your peers across all teams |
|        | All  | Team channel notification in Slack | Follow instructions provided to join your teams Slack channel |
|        | All  | GitHub notification email for team & repo creation | Read, click on link, and follow instructions to activate GitHub team membership |
|        | All  |                            | Meet your team |
|        | All  |                            | Create working guidelines and rules for how your team will interact |
|        | All  |                            | Begin project ideation |
|   2    | PM   | Wizard - \`/team progress\`  | Use \`Next Milestone\` to plan next steps |
|        | All  |                            | Agree on a project & define its scope |
|        | All  |                            | Create the backlog, assign tasks, and start your first development sprint |
|        | PM   | Wizard - \`/team status\`    | Define status after Sprint Progress Review & Sprint Completion Review |
|  3-8   | PM   | Wizard - \`/team progress\`  | Use \`Next Milestone\` to plan next steps |
|        | PM   |                            | Coordinate Sprint Planning with Team |
|        | Team |                            | Work on assigned tasks |
|        | PM   |                            | Coordinate Sprint Standup Review with Team |
|        | Team |                            | Participate in Sprint Standup Review |
|        | Team |                            | Work on assigned tasks |
|        | PM   |                            | Coordinate Sprint Progress Meeting with Team |
|        | Team |                            | Participate in Sprint Progress Meeting |
|        | PM   | Wizard - \`/team status\`    | Update status after Sprint Progress Review |
|        | Team |                            | Work on assigned tasks |
|        | Team |                            | Code Review & Merge |
|        | PM   |                            | Coordinate Completed Sprint Review with Team |
|        | Team |                            | Participate in Completed Sprint Review |
|        | PM   | Wizard - \`/team status\`    | Update status after Completed Sprint Review |

      ` },
    { creator: sys_id, topic: topic._id, sub_topic: voyage._id, title: '.. Tier1 Schedule',
      order: 3,
      content: `Tier 1 teams follow a different schedule than Tier 2 and Tier 3 teams due to the fact that they have different goals. While all tiers are focused on learning and improving their skills, Tier 1 Voyagers are concentrating on building foundational skills and learning how to work in a team, while Tier 2 & 3 teams are more
focused on rounding out their skills by working on complex problems.

## Schedule

This voyage is eight weeks long and is subdivided into eight sprints comprised of one four-day sprint for the team to get acquainted with one another and organize, one 7-day sprint devote to selecting and designin the project, five 9-day sprints for development work, and finally a Project Closure sprint to publish and celebrate your success.

| Sprint # | Start Date* |  End Date* | Sprint Goal                              |
|:--------:|:----------:|:----------:|:-----------------------------------------|
|    -1    | 02/02/2018 | 02/14/2018 | Voyage preparation including PM notification and training. Voyage invitations go out on Feb. 8!  |
|    0     | 02/08/2018 | 02/15/2018 | Onboarding: Get in slack, write intro, make sure everyone is prepared for the team announcement and launch on February 15 |
|    1     | 02/16/2018 | 02/18/2018 | *_Preparation & Team set-up_* - Get to know your team, select a PM, create your Team Charter, and start discussing project ideas |
|    2     | 02/19/2018 | 02/25/2018 | *_Design_* - Agree on a project, define its scope, create the backlog, assign tasks, and start your first development sprint |
|    3     | 02/26/2018 | 03/06/2018 | *_Development_* - Work on your project       |
|    4     | 03/07/2018 | 03/15/2018 | *_Development_* - Work on your project       |
|    5     | 03/16/2018 | 03/24/2018 | *_Development_* - Work on your project       |
|    6     | 03/25/2018 | 04/02/2018 | *_Development_* - Work on your project       |
|    7     | 04/03/2018 | 04/11/2018 | *_Development_* - Work on your project       |
|    8     | 04/12/2018 | 04/15/2018 | *_Closure_* - Showcase your finished project & celebrate your success as a team |

*Dates are formatted as \`mm/dd/yyyy\`

Each sprint consists of a set of milestones and events designed to provide feedback to your team, collect information to help the Chingu Organization improve your Voyage experience, and provide a transition between sprints.
      `},
    { creator: sys_id, topic: topic._id, sub_topic: voyage._id, title: '.. Tier2 & 3 Schedule',
      order: 4,
      content: `Tier 2 and Tier 3 teams follow a different schedule than Tier 1 teams due to the fact that they have different goals. While all tiers are focused on learning and improving their skills, Tier 1 Voyagers building foundational skills and learning how to work in a team, while Tier 2 & 3 teams are more
focused on rounding out their skills by working on complex problems.

## Schedule

This voyage is eight weeks long and is subdivided into eight sprints, each of which are one-week long (except during onboarding where it is slightly different).

| Sprint # | Start Date* |  End Date* | Sprint Goal                              |
|:--------:|:----------:|:----------:|:-----------------------------------------|
|    -1    | 02/02/2018 | 02/14/2018 | Voyage preparation including PM notification and training. Voyage invitations go out on Feb. 8!  |
|    0     | 02/08/2018 | 02/15/2018 | Onboarding: Get in slack, write intro, make sure everyone is prepared for the team launch following the team announcment on February 15  |
|    1     | 02/16/2018 | 02/25/2018 | *_Preparation & Team set-up_* - Get to know your team, select a PM, create your Team Charter, and start discussing project ideas |
|    2     | 02/26/2018 | 03/04/2018 | *_Design_* - Agree on a project, define its scope, create the backlog, assign tasks, and start your first development sprint |
|    3     | 03/05/2018 | 03/11/2018 | *_Development_* - Work on your project       |
|    4     | 03/12/2018 | 03/18/2018 | *_Development_* - Work on your project       |
|    5     | 03/19/2018 | 03/25/2018 | *_Development_* - Work on your project       |
|    6     | 03/26/2018 | 04/01/2018 | *_Development_* - Work on your project       |
|    7     | 04/02/2018 | 04/08/2018 | *_Development_* - Work on your project       |
|    8     | 04/09/2018 | 04/15/2018 | *_Closure_* - Showcase your finished project & celebrate your success as a team |

*Dates are formatted as \`mm/dd/yyyy\`

Each sprint consists of a set of milestones and events designed to provide feedback to your team, collect information to help the Chingu Organization improve your Voyage experience, and provide a transition between sprints.
      `},
    { creator: sys_id, topic: topic._id, sub_topic: voyage._id, title: 'Voyage Support',
      order: 5,
      content: `## Ensuring Accountability & Team Support

A big challenge in remote software teams is navigating challenges and regularly re-assessing the state of the team to ensure the opportunities are unlocked for committed members.

Support channels:

### Chingu-X & Tools

Chingu is a platform to launch opportunities for developers, but another part of Chingu is researching and developing ways to better facilitate those opportunities. We call this global collaboration lab Chingu-X, and they built:

* The Wizard Acts & Milestones - This is a tool to provide structure and a project roadmap for teams to follow. Project Managers will log the team's progress here which will also help us determine what teams need support.

* The Wizard Standups - This is a tool to better facilitate team communication. It will ping you twice a week to answer a few short questions (ex. What did you work on? What are you going to work on? What is blocking your way?) and relay that information back to your team.

### Support from Chingu Facilitators

1. **Weekly Check-in** - This weekly check-in with Chingu will be sent out at the start of every week and will be our way of assessing team health and to help you be accountable to your learning and team.

2. **Weekly HeartBeat powerup** - HeartBeat is our tool to determine what teams need support. We use the Weekly Check-ins as well as slack & github metrics to give every team a status of:

* GREEN (progressing well)
* YELLOW (may need some support)
* RED (team is in trouble, may need significant support or to be closed down)

Right now it is largely done manually, but Chingu's Lead Data Scientist @trion is currently working a machine learning-assisted tool to help automate this process. It's a time consuming process and part of the reason the Weekly Check-ins are so important. I (Chance) will spend Monday-Wednesday powering up the HeartBeat before...

3. **Team Support Day!** - This day will happen every Thursday/Friday (and Saturday if need-be). We will use the insights from HeartBeat to determine what teams need assistance each week. Anything from troubles gaining momentum to looking for a replacement for a member who got a job, this day is for making sure teams are on the right path.

### Community Support

Each Chingu Voyage has a few hundred developers from all levels who come from diverse backgrounds. Viewed as a collective brain, each Voyage is both a marvel of diversity and an excellent resource for you and your team. I encourage all teams to consider the collective brain of the Voyage as a team-mate.

You can access this collective brain in the following ways:

* **Slack channels** - #ask-for-help-here, #community-cht, #Project Managers, #resource-treasures
* **Weekly Check-ins** - there will be an opportunity to let us know of any improvements or ask for help on this check-in. For example, if you say your team needs help with Auth0, we may be able to find someone to send your team's way to help.
* **Chingu Medium Publication** - Every week Chingu will publish a Weekly Update on the Chingu ecosystem and all the wild projects & news from Chingu members.
      `},
    { creator: sys_id, topic: topic._id, sub_topic: voyage._id, title: 'What Team Am I On?',
      order: 6,
      content: `## Voyage Teams

If you are unsure as to which team you are on please consult the following. For each team this includes the Github id's of the team members, their timezones, skill sets, and goals, as well as the tier for each team.

[Voyage 4 - February to April, 2018](http://bit.ly/2EJKhS9)
      `},
    { creator: sys_id, topic: topic._id, sub_topic: setup._id, title: 'Understanding Your Obligations',
      order: 1,
      content: `## General

If everyone was fully committed and remained that way team projects would be much easier to finish, but the reality is that life will happen and some members will have to drop out. People will get developer jobs, personal emergencies will occur, etc.

This reality not as a negative, but as a tremendous opportunity to level-up your confidence and ability to adapt. It is because remote team software projects are so challenging that they can be such powerful learning experiences. This is especially true in a world of technological acceleration where an ability to persevere through challenges and learn quickly is highly rewarded.

## Shared Obligations

Chingu Voyages require the following from all participants, regardless of their role.

1. **Commit to finishing the Voyage**. If you start a Voyage you should make every effort to finish it.
2. Be active every week. Every week you should be doing some combination of the following: communicate with your team-mates, learning & working on tasks, some github activity.
3. Be open and tolerant of other ideas. Use the Voyage to expand your knowledge rather than to just build on what you already know.
4. Be open with your ideas and thoughts. Innovation doesn't take place in a vaccum.
5. Complete a Weekly Check-in so Chingu can assess the health of teams and provide ongoing support.

## Team Member Obligations

Anyone can write a function, but developing a modern complex application
requires a team. Working in a team requires a mix of hard and soft skills.
Successful teams are made up of individuals who:

1. Are kind to one another and respectful of opposing ideas.
2. Understand that disagreement doesn't mean you have to be disagreeable.
3. Ask for help when they need it, provide help to those who ask for it, and
don't assess blame when someone else makes a mistake.
4. Commit to attending team meetings and pair programming sessions.
5. Life Happens! Events sometimes occur in peoples lives that will prevent
them from honoring a commitment. As a team member, make sure that you notify
your PM as soon as possible if a situation arises that forces you to leave
the project or makes it impossible for you to meet your deadlines.

## Project Manager Obligations

Project Managers have the same obligations as other team members, but as
leaders they must also:

1. Motivate the team to accomplish the goal at hand rather than acting as a
dictator.
2. Ensure that everyone on the team has the opportunity to voice their ideas
and concerns.
3. Maintain the team backlog and task board
4. Report information and status to the Chingu organization at the specified
intervals.
5. Notify the Chingu Management team if a situation arises that makes it
difficult or impossible to complete your committments to your team and project
      `},
    { creator: sys_id, topic: topic._id, sub_topic: setup._id, title: 'Establishing the Team',
      order: 2,
      content: `## Starting Your Project
The hardest part of any project is getting started. Over several Chingu Voyages some common activities of successful teams have been identified that should help you to kick off your project.

### Building & Maintaining Momentum
Successful teams build momentum in the first week and unlock the opportunity to continue. Teams that don't gain momentum in the first week almost always fail. We spend a lot of time organizing teams to make them as robust as possible, but you and your team-mates are responsible for coming together to build the momentum necessary to complete a project.

Here are concrete steps you can take to ensure your team is successful:
1. Join the team-chat with energy & signal to your team-mates that you're excited to work on the project! If you're unsure what to say, copy/paste this: Hey all! I'm SUPER excited to learn and build with you!! 😄 🚀"
2. If members are enthusiastic, that will spread and the team will have momentum. If members come in apathetic and silent, the team won't gain momentum and will fail.
3. Learn [these principles](https://medium.com/chingu/30-ways-to-level-up-your-skills-stack-carnegies-wisdom-remix-4c532aabd0c0) and put them in action. Not only will it increase the likelihood of your team succeeding, but adding soft skills to your skills stack will make you a more successful person in all aspects of your life.
4. Use @username when talking to team-mates. This is specific and increases the likelihood that the person will reply back. When you talk to no one in particular, often no one will reply (because they don't know if they should reply or if someone else will reply).
Ex. "Hi @jdmedlock, @vannya, @pankaja, can you let me know when you're free this Saturday for a meeting?"
5. Take personal ownership of your team's success. I've seen teams where no one talks and when I ask each member individually why they aren't talking they say "I was waiting for someone else to talk." Don't be that person.

### Create your team charter
Your teams charter will define the values all members of your team share with regard to how they interact with one another, how work is identified and assigned, and the process your team will follow to get work done. These don't have to be lengthy, but they should define how you will conduct your work to avoid confusion later in the project.

Some examples include:

- [Team-Charter Template](https://moorepants.github.io/eme185/pages/team-charter-template.html)
- [Team-Charter of a previous Chingu Voyage team](https://github.com/chingu-voyage3/toucans-06/wiki/Code-Standards,-Process,-Visions,-and-Goals)
- [Team-Charter Example](https://github.com/krismy93/SoftwareEngineering/wiki/Team-Charter)
- [Review-Team-Charter](https://github.com/gregorbj/VisionEval/wiki/Review-Team-Charter)


### Identify two times a week when all team members are available

Note: We will have a [meeting coordinator bot](https://meekan.com/) in Voyage to help teams to schedule meetings.

Successful teams communicate with one another not just via Slack, but also in realtime in Team Standup (i.e. Scrum) meetings. These are short meetings (<30 minutes) where each team member answers these questions:

1. What have I done since the last Scrum meeting?
2. What will I do between now and the next meeting?
3. What issues or questions have I encountered that I need help with?

Identifying times for these meeting at the beginning of the project places a "stake-in-the-sand" that team members can plan their time around.

### Selecting a Task Board
For a project to operate smoothly members of the team don't just need to establish operating guidelines and meeting times, they also need to understand what tasks are assigned to them and when they are needed. To do this means you'll need a task board to document your user stories and where each one currently lives within your workflow.

Many good tools exist for this including GitHub Projects, Trello, and Waffle.io to name a few. These tools all allow tasks, as a user story, to be created in a task card format, which can then be moved through the milestone lanes that make up your teams workflow. For example, common milestones are inbox, backlog, in progress, review, completed.

Updates to the backlog of work items should be performed during your weekly meetings. All team members share ownership of the items in the backlog. Just as no single team member owns a specific section of the codebase no single team member owns the backlog. Everyone should work to keep the backlog accurate and up to date. However, performing the update during team meetings helps to ensure that everyone understands the changes and that change isn't introduced in a vacuum.

Here are a few examples:

- [Toucans example on Github Projects](https://github.com/chingu-voyage3/toucans-06/projects/1)

- [Bears example on Trello](https://trello.com/b/91AF3Eh9/chingu-project-example)

![](https://github.com/Chingu-cohorts/voyage-wiki/blob/development/images/Example%20Task%20Board.png)

## Additional Resources
- [A Short Introduction to the Scrum Methodology](https://medium.com/chingu/a-short-introduction-to-the-scrum-methodology-7a23431b9f17)
- [GitHub Projects](https://help.github.com/articles/about-project-boards/)
- [Trello](https://www.trello.com)
- [Waffle.io](https://www.waffle.io)
- [ZenHub](https://www.zenhub.com)

      `},
    { creator: sys_id, topic: topic._id, sub_topic: setup._id, title: 'Setting Up Your Git Workflow',
      order: 3,
      content: `## Importance of Good Practices

Your projects source code is its single most important artifact. The loss or corruption of your code base is a catastrophic event that can impact not just your project, but also your [reputation](https://about.gitlab.com/2017/02/01/gitlab-dot-com-database-incident/) as a professional developer.

This makes it critical that your team defines the process everyone on the team will rigidly adhere to when making and promoting changes. The good news is that despite its importance establishing a solid Git Workflow isn't difficult and both git and GitHub are battle tested tools.

## Working / Development / Master Branch Workflow

There are multiple workflow models you can choose to adopt, but if you are new to git and GitHub one such model to consider is presented here. This model is based on the assumption that your team will set up a skeleton repo in GitHub from which all team members will then clone to their computers.

### Git Branches

A three level hierarchy of branches is created through which changes are promoted.

- *_working branches_*: Are individual branches created by each developer when
they are working on changes and bug fixes. There are 4 basic types of branches:
bug, feature, refactor and style, after the type comes the name, it should
specify on top of the branch type. For example feature/course-review. Consult
the wiki for more details and examples.
- *_development_*: Reflects the candidate code for the next release. Developers
work in working branches, which are then pulled into this branch. All code
pulled into this branch must be tested and undergo peer review as part of the
PR process.
- *_master_*: Only updated from PR's from the development branch for release. This
branch always reflects the current production release.

### The Workflow

![Git Workflow](https://github.com/Chingu-cohorts/voyage-wiki/blob/development/images/Git%20Workflow.png)

1. Once the skeletal repo is built in GitHub team members will clone it to their individual computers. Working branches are created for specific features and tasks (like bug fixes) you will be called upon to perform.
2. All normal development activities occur on team members individual computers. Commits should be frequent and each commit should have a discrete, atomic purpose.
3. Changes should be frequently push to the working branch on GitHub that matches the one on individual computers. This ensures that if a computer is lost, stolen, or malfunctions your work will still be available to the rest of your team.
4. From time-to-time you may need to pull working branches to your individual computer. For example, when you are helping another team member with one of their tasks.
5. Once a feature has been unit tested a Pull Request (PR) should be created to fold it into the development branch. It's always a good idea to require that PR's be reviewed by another member of the team. This helps to ensure that the quality of the app is maintained.
6. When a group of features are ready to be promoted to Production they should be thoroughly tested together an then a Pull Request created to move them into the master branch which reflects the code base that's in Production or soon to be promoted to Production.
7. Once the PR to the master branch has been completed you are then ready to release its contents into your Production runtime environment.

## References

- [GitHub Guides](https://guides.github.com/)
- [How to not f- up your local files with Git **part 1** ](https://medium.com/@francesco.agnoletto/how-to-not-f-up-your-local-files-with-git-part-1-e0756c88fd3c)
- [How to not f- up your local files with Git **part 2** ](https://medium.com/@francesco.agnoletto/how-to-not-f-up-your-local-files-with-git-part-2-fc4e243be02a)
- [How to not f- up your local files with Git **part 3** ](https://medium.com/chingu/how-to-not-f-up-your-local-files-with-git-part-3-bf03b27b6e64)
- [GitHub Help](https://help.github.com/)
- [tryGit](https://try.github.io/levels/1/challenges/1)

      `},
    { creator: sys_id, topic: topic._id, sub_topic: setup._id, title: 'Defining Your Project',
      order: 4,
      content: `## Introduction

When you start a new project one of the first things you'll need to do is to define the tasks that must be completed to meet the projects goals. One of the main responsibilities of your teams PM is to coordinate a "brainstorm" with the team to define who your users are, the value the app will bring to each of them, and the high level components of the app responsible for delivering this value.

## Workflow
Once you've done this the next step is to start defining more discrete tasks and adding them to your project backlog. What is a "backlog"? Very simply its just a place where you maintain the tasks your project needs to complete, but which haven't yet been started. Agile projects organize themselves around a project board that's consists of the following vertical lanes:

- _Backlog_ - the stories we know we need to do, but haven’t gotten to yet
- _Next_ - the stories we know need to be performed in the next Sprint. If we complete all the stories in the current sprint we’ll go here to get more work before dipping into the backlog
- _In Progress_ - The stories that have to be completed in the current Sprint. Don’t overload this with stories! at the beginning of the Sprint you’ll need to decide as a team what needs to be done in the upcoming sprint
- _Blocked_ - Stories that have been started, but can’t be completed due to an unfulfilled dependency on another story or due to a decision that needs to be make, or a technical issue. These should be resolved as quickly as feasible so you don’t accumulate technical debt.
- _Done_ - Stories that have been completed. It’s important to move a story card to this lane only with the story is fully completed - Coded, tested, and promoted to your release branch

This is also known as a Kanban board and it imposes a workflow to your project that gives you visibility to the progress of the project based on the state of its tasks.

## An Interlude: Agile vs. SDLC Project Management

Once you have an idea of what very high level components make up your project you will need to start defining the tasks that must be completed to build them. In traditional Software Development Lifecycle (SDLC) project management methodologies the result was called the *_work breakdown structure (WBS)_* which was typically just a list of the tasks, their relationship to one another, and estimate of time for completion, and who they were assigned to. In SDLC all tasks were defined at the start of the project allowing the project manager to provide an accurate estimate of cost and target date for the project. However, over time it has been proven that for many types of projects this highly structured and rigid approach simply doesn't work.

Agile project management (of which Scrum is one methodology) is based on the fact that "you don't know what you don't know" at the start of the project and as you progress more details will surface that you'll need to react and adapt to. Agile methodologies are based on the following principles which contrast them to traditional SDLC approaches:

- Individuals and interactions over processes and tools
- Working software over comprehensive documentation
- Customer collaboration over contract negotiation
- Responding to change over following a plan

## Sprints

With an Agile approach you will divide the time between the start of your project and its delivery date into *_sprints_* of equal duration in which you'll be completing tasks. At the start of each sprint you and your team will review the backlog and choose the tasks that must be completed in the new sprint. If you complete all of these before the end of the sprint then you'll start new tasks, one-at-a-time, from your backlog to fill the remaining time.

Dividing your project in this way and planning and executing in a progression allows the team to adapt to change and to start tasks at the optimal point in time when enough details are known to allow development to be both efficient and result in something that is relevant.

## Building the Backlog

Building the backlog of tasks involves breaking down your project into discrete tasks. A good place to start is to treat every page in the app as a component and organize them in a logical sequence based on their dependency to one another. For example, you’ll probably want to complete your ‘Create Thing’ page before starting in on a ‘Search for Thing(s)’ page.

Once you've done that define a *_user story_* for each unit of work needed to build the components. These should be very discrete and each one should be able to be completed in a single sprint. User stories are not expressed in technical terms. Instead they identify the persona that will use the delivered piece of functionality, what that requirement is, and the value they will realize from it. This may sound very foreign to you in your role as a WebDev, but its critical to ensuring that your product delivers value to the end user. The most technically beautiful implemented app is useless if it doesn't deliver on this value proposition.

User stories help you to define what both "good" and "done" mean with respect to the development of your application.

Stories are simple statements having a form such as:
\`\`\`
As a <persona>
I want <requirement>
So I can <value-statement>
\`\`\`
For example,
\`\`\`
As an Idea Creator
I want to provide the URL’s to any supporting diagrams. URL’s should have a plain text description in addition to the URL itself.
So I can quickly and easily provide reviewers with more detail about my idea
\`\`\`
Even though the story is expressed in non-technical terms this doesn't mean that you can't annotate it with technical details as they become known. Many of the tools you have at your disposal allow story cards to contain additional information. However, while documentation is important keep in mind that Agile values working code over comprehensive documentation this doesn't mean you don't produce documentation. It means you produce it at the right level of detail and at the right time.

Many teams do find it useful to annotate the user stories with very high level checklists listing the steps to be completed for the story and the order they are to be completed in. It's important to keep in mind that these define what is to be done and not how it is to be done. It's just as important to first concentrate on building the user stories before starting work on defining the steps involved in each story.
\`\`\`
As an Idea Creator
I want to provide the URL's to any supporting diagrams. URLs should have a plain text description in addition to the URL itself.
So I can quickly and easily provide reviewers with more detail about my idea
[] Define the constraints for the URL and its description
[] Define layout of these fields on the Idea screen
[] Create component to support capture, display, and edit of these fields
[] Add these fields to the database
[] Add support for maintaining this information in the various backend idea routes
\`\`\`
Remember that the focus of the user story is to classify who your users are, what functionality they require, and the value each function will deliver.

## Backlog Grooming

Once you have defined your initial backlog of tasks you can start your first sprint as previously described. With each team meeting and each sprint you will be updating the backlog with new information that comes to light. This will involve adding, modifying, and even removing stories. You'll find that some stories aren't granular enough and must be broken up into additional stories, you'll find than stories you thought were completed need to be moved out of the Done lane on your project board and back into In Progress. In short, keeping the backlog relevant is a never ending task while the project is underway.

## Wrapping It Up

This has been a very light introduction to Agile project management and has been focused on practical steps to get your project to the point where you can start Sprint 1. Just as there are many paths to failure there are also many paths to success.

## For More Information

[A Short Introduction to the Scrum Methodology](https://medium.com/chingu/a-short-introduction-to-the-scrum-methodology-7a23431b9f17)
      `},
    { creator: sys_id, topic: topic._id, sub_topic: sprints._id, title: 'Creating a Readme',
      order: 1,
      content: `## Creating a Readme

A well written and organized README is an essential component of every project.
Your project's README is a valuable source of information for members of the
project team as well as any potential contributors.

- [Documenting your projects on GitHub](https://guides.github.com/features/wikis/)
- [About Writing and Formatting on GitHub](https://help.github.com/articles/about-writing-and-formatting-on-github/)
- [A Template to Make a Good README](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
- [A Curated List of Awesome README's](https://github.com/matiassingers/awesome-readme)

      `},
    { creator: sys_id, topic: topic._id, sub_topic: sprints._id, title: 'Pair Programming',
      order: 2,
      content: `## What is Pair Programming?

There is an oft quoted adage that "two heads are better than one". *_Pair
Programming_* is a practical implementation of this advice. It leverages the
experience and knowledge of two developers to improve the speed at which an
app is created, but also its quality.

In this process two developers work together, either side-by-side or via
screensharing, with one writing code while the other reviews the code as it is
being written. The developer reviewing the code examines it not just for
correctness, but also to ensure that it's clear, supportable, and resilient.

The pair keep up a running dialog and frequently switch roles.

The advantage of pair programming is the developer writing the code can focus
on the tactical attributes of the code since the developer who reviews the code
is responsible for the strategic aspects.

## Where Can I Find More Information?

- [What is Pair Programming](https://stackify.com/pair-programming-advantages/)
- [How to Pair Program in 7 Steps](https://www.wikihow.com/Pair-Program)
- [Wikipedia](https://en.wikipedia.org/wiki/Pair_programming)

      `},
    { creator: sys_id, topic: topic._id, sub_topic: sprints._id, title: 'Tracking Issues',
      order: 3,
      content: `# Introduction
Your team should consider using GitHub not only for source code management, but also for issue reporting. The purpose of the following guidelines is to provide guidance on how to report an issue. You might be asking yourself "How hard can this be?". You might be surprised to find out how often bad issue reports are actually created. Here are some examples:

- "The profile screen doesn't work right. Please correct this asap."
- "When I hit the Option-B key combination nothing happens."
- "Damnit how many times must I ask for this frigging software to work right. On the account entry screen the phone number textbox doesn't accept a country code"

The problem with the first two examples are they don't describe what the error actually is or where it's occurring within the application. The second example is marginally better since it defines how to recreated the problem, but that information is useless since there's still no indication of which screen the user was on when Option-B was attempted.

The last issue report is the best of the three since it defines which screen the user experienced the issue on, what she was trying to do, and what the expected outcome was. Unfortunately the first sentence is totally useless information that's inappropriate for an issue report and sends a signal to whoever works on this issue that the user is going to be difficult to work with. The lesson here is that issue reports should be factual and not emotional.

Keep in mind that this what is presented below is a way to customize the out-of-the-box GitHub Issue reporting system. However, you could just as easily use the GitHub default until you see a need for customization. This is a team decision based on your projects unique needs.

# Issue Reporting Template
The result of having the complete, accurate, and appropriate information is that the Developer will be able to resolve the issue faster and more correctly. The key information that should be entered into the issue are:

- Description of what occurred and what the desired outcome should have been.
- Summary of the symptoms including screenshots and logs, if available.
- List of steps the Developer can follow to recreate the problem. This should include not only navigation steps, but also data values that are to be entered.

The information above should be entered by the individual that report's the issue. When the issue is resolved the Developer is responsible for describing how the issue was resolved along with any supplemental information that may be useful to other Developers if the issue should reoccur in the future.

To help ensure that this information is properly captured we ask our users and developers to use the following template when creating issues for IdeaNebulae. Simply copy and paste this into new issues and then enter information about your issue in the appropriate section.
\`\`\`
**_Issue Description & Expected Outcome:_**

**_Symptoms:_**

**_Steps to Recreate:_**

**_Resolution:_**
\`\`\`
# The Importance of Labels
Having the complete and accurate information that describes an issue is important, but so is classification of the issue. Classifying or grouping issues into categories helps the Development team to triage issues so they are worked on in the proper order. However, if you choose to use the basic set of default labels already defined by GitHub on your repo that's okay. You can always get more complicated, but it tougher to go in the other direction.

This project uses GitHub Issue Labels for classification. These labels and their definitions are shown below.
\`\`\`
Label                 Description
--------------------  ---------------------------------------------------------
                      Issue type
type:bug              ..A defect resulting in a deviation from expected results
type:documentation    ..A defect in documentation or need for additional clarity
type:enhancement      ..Request for an minor enhancement
type:feature request  ..Request for a major new feature
type:question         ..A question to the Development Team
type:refactor         ..Request by Developer to modify how the code currently
                        accomplishes a given function.
                      Priority
priority:must have    ..Significant impact to user requiring ASAP resolution.
                        Users are encouraged to describe the impact in the
                        issue description.
priority:should have  ..Issue has an impact to the app that detracts from it's usefulness, but a work around exists.
priority:nice to have ..Issue has no longterm impact to the effectiveness or value of the app, but would improve it.
                      Status
status:on hold        ..Deferred, unable to resolve at this time.
status:duplicate      ..Duplicate issue. Development team will add this tag along with the issue number of the original problem report, then close the duplicate issue.
                      Scope of Development Effort
scope:story           ..Small or trivial unit of work
scope:epic            ..Moderate amount of work that consists of multiple user stories and may span more than one sprint.
scope:saga            ..Considerable effort required that consists of more than one epic and spans multiple sprints.
\`\`\`
Issue Type and Priority labels are to be assigned by whoever creates the issue. Status and Scope labels are maintained by the Development Team.

While issue type, priority, status, and scope labels are used to classify an issue or task, state defines where the the issue or item resides within the team's workflow. Workflow states correspond to the lanes or silos in the Agile Task or Kanban board used by the team to manage and monitor their progress.
\`\`\`
Label                 Description
--------------------  ---------------------------------------------------------
                      Workflow State
state:inbox           ..Starting state for all new user issues awaiting triage.
state:backlog         ..Issues and tasks that have been triaged, but have not yet been started.
state:next            ..Issues and tasks that haven't been started, but are scheduled to be worked on next.
state:in progress     ..Issues and tasks being actively worked on by the team.
state:review          ..Issues and tasks that have been completed, but are awaiting review and PR.
state:done            ..Issues and tasks that have been completed.
\`\`\`
Issues and tasks added by the team typically start in state:backlog and move to other states following discussion during team meetings. On the other hand, issues and tasks directly created by users start out in state:inbox until they have been triaged by the team. This makes it easier for the team to ensure that user issues and requests aren't overlooked.

# Examples

The best source of examples for how issues are to be defined an labeled is the [Voyage Issue Log](https://github.com/Chingu-cohorts/voyage-wiki/issues).
      `},
    { creator: sys_id, topic: topic._id, sub_topic: closure._id, title: 'TBD',
      order: 1,
      content: `TBD `},
    { creator: sys_id, topic: topic._id, sub_topic: tools._id, title: 'Useful Links',
      order: 1,
      content: `Some websites and resources you may find useful are:

- [Chingu Medium Publication](https://medium.com/chingu)
- [Chingu Website](https://chingu.io)
- [Chingu YouTube Channel](https://www.youtube.com/channel/UCS7zmJXbe7FgTC3sHlUf4jw)
- [Project Managers Repository of Knowledge (PMRoK)](https://github.com/Chingu-cohorts/pmrok/wiki)
- [Voyage 4 Handbook](https://medium.com/chingu/the-voyage-4-handbook-33c1c90b855b)
- [Voyage Projects](https://medium.com/chingu/chingu-voyage-4-team-projects-lineup-320a8bc87701)
      `},
    { creator: sys_id, topic: topic._id, sub_topic: faq._id, title: 'Voyage wiki',
      order: 1,
      content: `## Voyage Wiki

### I've found an error or omission! How do I request a change?

We love finding and fixing errors and omissions! We also love hearing your ideas for how to improve this wiki to help make it more relevant not just for you, but for future Chingu Voyagers.

To report an issue or to request a new topic open an issue in the [Voyage Wiki Issue Log](https://github.com/Chingu-cohorts/voyage-wiki/issues). Be sure to describe what's needs correction or your topic suggestions in as much detail as possible.

      `},
    { creator: sys_id, topic: topic._id, sub_topic: faq._id, title: 'Voyage',
      order: 2,
      content: `## Voyage

### What's Expected of Me?

[Section 02.Understanding Your Obligations](https://github.com/Chingu-cohorts/voyage-wiki/wiki/Section-02.-Understanding-Your-Obligations) cover the expectation for Project Managers and Team Members in detail. However, keep in mind that **_consistency_**, **_participation_**, and **_commitment_** are key to your Voyage success. Maximizing your Voyage benefits will require that you are committed to consistent participation and a commitment  to being open and fair with your team mates. You are all together whether it be in success or failure.

### Where Can I Find More Information About this Voyage?

There are four primary channels of information about a Voyage:

- Voyage Wiki

The Voyage Wiki, which you are currently reading (congratulations!) is maintained across Voyages and contains the collective experience and wisdom of the teams who have gone before you.

- [Chingu publication on Medium](https://medium.com/chingu)

The Chingu publication on Medium contains information related to the current Voyage and is relevant to all participants. You'll receive links to these articles in emails and in the \`#chingu-news\` channel in Slack.

- email

Email contains information that is specific to a particular individual and is used sparingly. Emails are typically sent to announce your acceptance into an upcoming Voyage, to notify you when the Voyage starts, and to invite you to Slack channels and your team's Voyage Project repo on GitHub.

- Slack

Slack is where you collaborate with those on your team, as well as with other Chingu's. This is your normal communication channel where you get things done during a Voyage. A unique Slack "team" is created for each Voyage and to which all participants are invited. A private channel will be created in Slack for just your Voyage team, but public channels will also be created within it to allow communication and collaboration across all teams.

### How Do I Report Suggestions and Problems with the Template Repo?

The Chingus are a collaborative organization of individuals who share a
common goal, but not necessarily a common path to success. As a result you
will have ideas and suggestions the Voyage planners haven't thought of.
Similarly, you will run across mistakes we haven't caught.

Making the Chingu platform stonger and more relevant to the needs of its
members is an important task and one that's one responsibility of every
Chingu. As a result please take the time to open an issue [here](https://github.com/jdmedlock/voyage-repo-template/issues) if you have an idea,
suggestion, or correction to report.

      `},
    { creator: sys_id, topic: topic._id, sub_topic: faq._id, title: 'Your Team',
      order: 3,
      content: `## Your Team

### What Makes a Successful Team?

Successful teams do three things in the following order of importance:

1. Be nice to one another

Team members aren't required to be in total agreement. In fact, there considerable evidence that differences of option accelerates innovation. However, while it's okay to disagree it is not okay to be disagreeable. Great teams are open to new ideas, change, and working together to identify the best path to success.

2. Collaborate and communicate openly on a regular basis

High functioning teams communicate and collaborate both formally and informally. Formal communications typically occur as part of your weekly Sprint/Scrum meeting(s). Informal communication are those between individual members and usually start with a question like "I'm having a problem..." or "What do you think about this?...".

3. Work in an Agile fashion

Working in this type of fashion means following an Agile methodology like [Scrum](https://medium.com/chingu/a-short-introduction-to-the-scrum-methodology-7a23431b9f17). However, any Agile methodology is based on design only to known requirements, don't try to anticipate future requirements, develop using frequent iterations, and refactor as situations change.

### What are the Team Roles?

At the start of a Voyage 3-4 Chingu's are assigned to a team. One team member will act as a Project Manager (PM). Therefore there are two distinct roles - PM and Team Member. The PM helps to organize and maintain the teams backlog of tasks (i.e. *_user stories_*) and report status to the Chingu organization, but everyone shares the responsibility to work on these tasks to complete the project.

Your team is free to structure itself in anyway it feels is best for success though. There are many paths to success and its up to your team to find the one that's best for you.

### What Should a Team Do First?

A careful review of the emails and Medium articles for the current Voyage is the best starting point. Next, look at the contents of this wiki, and then discuss [Section 03.Establishing the Team](https://github.com/Chingu-cohorts/voyage-wiki/wiki/Section-03.-Establishing-the-Team) with the project team.

### Are Soft Skills Important?

The importance of soft skills in the global economy is unequivocal, but there is a lot of debate and research presently on the best way to teach people these increasingly important skills.

We do not purport to have the final answer to this question, but it seems that deliberate practice & experience is key. If you have been in a remote team project before, you likely appreciate the importance of team dynamics. A team of enthusiastic learners with soft skills can unlock opportunities unimaginable before. A team of all-star coders with no soft skills usually fail.

At this point, I have overseen hundreds of teams with thousands of learners from over 120 different countries, and it is clear that soft skills are wildly advantageous. While the demand for specific hard skills will come and go (ex. yesterday jQuery, today React, tomorrow something different), the ability to learn what is needed and work effectively in teams are skills that will benefit you for your entire life and career.

Here are [30 soft skill principles](https://medium.com/chingu/30-ways-to-level-up-your-skills-stack-carnegies-wisdom-remix-4c532aabd0c0) that can level-up your skills.

### What should I do if there's a change in the time I have available for this Voyage?

Life happens! It's common for unforeseen events to occur that will restrict or eliminate the time you think you had available to devote to a Voyage after it starts. If this happens the first step is to notify your team of the change to your level of commitment. Next, make sure you have documented your work and that GitHub reflects the current state of your tasks. Nothing is more frustrating to a team than to be held up waiting on something you had promised them.

### What should I do if one or more members of my team aren't responding?

If a team member stops communicating the PM should start by emailing the individual and if there is still no response note this as part of the Weekly Checking. Thursday's are set aside as "Repair" Days for members of the Chingu Management team to work with the PM to identify the best course of action. For example, add a new member, merge teams, etc.

### What if it's the PM who isn't responding?

Send a direct message (DM) to @chance as soon as possible.

### What should I do if there is disagreement within the team?

Disagreement is something that's normal and should be resolved calmly and in a rational manner. There is no need to be disagreeable. All Chingu's are here to learn and improve, and there is nothing about our projects that justify a heightened level of emotion - no one will die if one of these apps isn't right!

Start by treating a disagreement as you would any other problem. Make sure there's a clear and concise statement of the problem. Then as a team build a list of pros and cons. Weight these if necessary to highlight those that are more important than other. Then discuss and vote. If there's no clear consensus then the PM should choose a solution. Remember, if you choose the wrong solution you will have learned something valuable and you can refactor.

      `},
    { creator: sys_id, topic: topic._id, sub_topic: faq._id, title: 'Git & GitHub',
      order: 4,
      content: `## Git & GitHub

### Why GitHub?

GitHub is one of several software as a service (SAAS) options for maintaining Open Source software such as that produced during a Voyage. GitLabs and Bitbucket are examples of other widely used source code repositories. The Chingu organization uses GitHub due to its broad acceptance within the Open Source community, high degree of maturity, and tight integration with \`git\`.

Equally important is the fact that we collect metrics from Voyage repos to help in the measurement of the progress of the Voyage, isolating the attributes common to successful teams, and identification of best practices. Dealing with a single source code repository makes this task easier than dealing with ten or even three different repositories.

In other words, **_we are ~~lazy~~ efficient_**.

### I Can't Access or Push to My Teams repo. What Should I Do?

At the start of a Voyage your team's repo will be automatically set up and your team members will be authorized for access. If you are having access issues it's most likely due to an authorization issue. Your PM has the admin privileges necessary to correct this type of issue.

      `},
    { creator: sys_id, topic: topic._id, sub_topic: faq._id, title: 'Slack',
      order: 5,
      content: `## Slack

### Why Slack?

We chose Slack and have been using it since the start of the Chingus due to its widespread use, features, and most importantly the fact that its used in many companies so it was felt that it would help prepare Chingus to be “job ready”. Other tools are periodically discussed, but so far none have had benefits that outweigh the cost and disruption associated with conversion. We have a considerable amount of automation built up in Slack that we depend on.

### Why are my older Slack posts disappearing?

Chingu uses the free version of Slack with automatically limits the number of viewable and searchable messages to 10,000. See [Slack Help](https://get.slack.help/hc/en-us/articles/115002422943-Message-and-storage-limits-on-the-Free-plan)

### What Slackbots are Installed?

The command \`/\` entered by itself in the Slack message box will display a list of the Slackbots installed in your channel?

### What Slackbots are Available?

To see what Slackbots are available consult the [Slack App Directory](https://chingu-voyage4.slack.com/apps). Also keep in mind that documentation for how to used individual Slackbots is also located on this site.

### Message Formatting

Slack supports various ways to format your messages to help in creating clear and readable text. Formatting options are documented [Slack - Format your messages](https://get.slack.help/hc/en-us/articles/202288908-Format-your-messages).

One formatting option to emphasize is to format any code you include in messages by surrounding it with 3 backticks ('\`') just as you would in Markdown. This makes it far easier to read than normal prose.

      `},
    { creator: sys_id, topic: topic._id, sub_topic: faq._id, title: 'Project Licence',
      order: 6,
      content: `## Project License

### Why Are Licenses Important?

Software licenses, regardless of whether they are intended for open source or commercial projects, are designed to protect the intellectual property of the owner. Even though your apps are developed using Open Source principles they none-the-less have value and its in your best interest to take the minimum steps necessary to protect the efforts of you and your teams labor.

### Where Can I Learn More?

[Comparison of Free and Open-source Software Licenses](https://en.wikipedia.org/wiki/Comparison_of_free_and_open-source_software_licenses)
[OpenSource.org](https://opensource.org/licenses)

### How Do I Choose a license?

[Choose a License](https://choosealicense.com/) is one resource that can help you evaluate the differences between the various open source licenses so you can make an informed decision.

      `},
    { creator: sys_id, topic: topic._id, sub_topic: faq._id, title: 'Glossary',
      order: 7,
      content: `**_backlog_** - The main source of information about the project is
the _Product Backlog_, which defines requirements the application must meet in order to be successful. Requirements are expressed as user stories of the format: “As a: <role> I want to: <function-description> So I can: <value-statement>”

**_blocker_** - Any issue or task that is preventing the project from moving forward or is preventing another task from being able to be started.

**_branch_** - Branches are used to propose changes to GitHub projects. A branch is a parallel version of the main line of development in the repository, or the default branch. Excerpted from [GitHub Help - About Branches](https://help.github.com/articles/about-branches/).

**_commit_** - Stores the current contents of the index in a new commit along with a log message from the user describing the changes. Excerpted from [Git Documentation](https://git-scm.com/docs/git-commit).

**_burndown chart_** - A graphical view of the number of stories in the backlog that have been completed against the total number remaining across sprints.

**_merge conflict_** - Git can often resolve differences between merged branches. Usually, the changes are on different lines, or even in different files, which makes the merge simple for computers to understand. However, sometimes there are competing changes that Git needs your help with to decide which changes to incorporate in the final merge. Often, merge conflicts happen when people make different changes to the same line of the same file, or when one person edits a file and another person deletes the same file. You must resolve the conflict before you can merge the branches. Excerpted from [GitHub Help - About Merge Conflicts](https://help.github.com/articles/about-branches/).

**_pull request (PR)_** - Pull requests let you tell others about changes you've pushed to a repository on GitHub. Once a pull request is opened, you can discuss and review the potential changes with collaborators and add follow-up commits before the changes are merged into the repository. Excerpted from [GitHub Help - About Pull Requests](https://help.github.com/articles/about-pull-requests/).

**_README_** - A README file, along with a repository license, contribution guidelines, and a code of conduct, helps you communicate expectations for and manage contributions to your project. Excerpted from [GitHub Help - About READMEs](https://help.github.com/articles/about-readmes/).

**_rebase_** - The git rebase command allows you to easily change a series of commits, modifying the history of your repository. You can reorder, edit, or squash commits together. Excerpted from [GitHub Help - About Git Rebase](https://help.github.com/articles/about-git-rebase/).

**_repo_** - A repository is like a folder for your project. Your project's repository contains all of your project's files and stores each file's revision history. Excerpted from [GitHub Help - About Repositories](https://help.github.com/articles/about-repositories/).

**_sprint_** - Application development cycles lasting from one to four weeks. Sprint length is fixed across the life of the project and is chosen by the team. A fixed number of user stories are assigned to each sprint. This is not to say that stories cannot be added to the sprint. Just that they can’t be added if doing so exceeds the capacity of the team to create, test, and deploy a working application by the end of the sprint.

**_story points_** - A measure of relative effort or difficulty required to complete a given story. Part of the backlog grooming process is for the Scrum Team to review user stories and estimate the number of story points required for each one. There are many different methods that can be used for this and the one chosen by the Scrum Team isn’t as important as the need to be consistent when estimating story points.

**_velocity_** - Measures the average rate that stories are completed across sprints. The basic method is to divide the number of story points completed by the total number in the product backlog. Over time velocity is a measure of the work that can be expected to be completed in a sprint and it is used to ensure that the team doesn’t overcommit the number of story points to be completed in a given sprint.
      `}
  ]);
};

module.exports = seedVoyage;
