#!/usr/bin/mongo

/* eslint-disable */

// Run this script *after* seedDb.js

const db = new Mongo().getDB('cms');

const c = db.users.find({username: 'sys'});
const user = c.hasNext() ? c.next() : null;
const sys_id = user._id;

db.articles.insert([
  // { creator: "1", topic: "", sub_topic: "", content: "" },
  { creator: sys_id, topic: "PMRoK", sub_topic: "About this wiki", title: 'The Chingu PMRoK',
    content: `# The Chingu Project Management Repository of Knowledge

Welcome to the PMRoK Wiki!

## Purpose

The Chingu Project Management Repository of Knowledge is a place for Chingu
project managers to share information and lessons learned with one another.
While no one project management methodology is used within the Chingu
organization, the ones used are all rooted in an Agile and Lean way of directing
and performing project work.

The information included here is free for you to share inside and outside your
teams. However, as a Chingu PM you have the responsibility of helping this
site grow and mature by:

- **Ensuring that the information here is accurate.** You are expected to either
open an Issue for any errors or inconsistencies you find or, in the spirit of
Agile development, fix it yourself.
- **Collaborating with your fellow PM's** to identify areas of our project
management practices and processes that need improvement and creating the
content needed to fill any gaps.
- **Questioning the status quo.** We should drive continuous improvement by
reflecting on what we do, finding faster and better ways to manage our
projects, and being open to new ways of doing things.

### Issues & Questions

Issues and questions should be logged in the [PMRoK Issue Log](https://github.com/Chingu-cohorts/pmrok/issues). This is important to ensure
that issues and questions are addressed in a timely manner and so serve as
both an ongoing reference as well as a historical record.

For information about how to open an issue see
[Section A4. Managing User Issues & Requests](https://github.com/Chingu-cohorts/pmrok/wiki/Section-A4.-Managing-User-Issues-&-Requests) in
this wiki.

    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "About this wiki", title: 'How to Contribute',
    content: `## Why Contribute?

Keeping the information and advice in PMRoK up to date is important not only
for the Voyage that's currently in progress, but also for future Voyages.
Not only does contributing help build the repository of PM knowledge for the
PM's that will follow you, but doing so will also help you to improve and
extend your PM skills.

## How to Contribute

Making corrections or adding content to PMRoK follows a process very
similar to the one you use when making contributions to your Voyage projects.
GitHub Wiki's are implementated in a manner that doesn't allow changes to be
approved and merged use the Pull Request (PR) mechanism available to normal
repos.

Due to this a "mirror" repo has been created that you will use to make changes
just like you do in a normal project repo. TravisCI integration has been set
up in the mirror to automatically push changes from the \`master\` branch once
a PR for a change has been reviewed, approved, and merged from \`development\`
into \`master\`.

This architecture was adapted from this [article](http://www.growingwiththeweb.com/2016/07/enabling-pull-requests-on-github-wikis.html)
and the following diagram depicts the change management flow for PMRoK.

![PMRoK Change Management Workflow](https://github.com/Chingu-cohorts/pmrok/blob/development/diagrams/PMRoK%20Change%20Mgt%20Workflow.png)

### First Time Local Repo Setup
Start by cloning the "mirror" repo, [pmrok-chgmgt](https://github.com/Chingu-cohorts/pmrok-chgmgt),
your computer. By default the \`development\` branch will be cloned onto your computer.

### Refreshing the Local Repo
If you have previously cloned the "mirror" repo you should *_always_* refresh it from the PMRoK Wiki, not the "mirror" repo. This will ensure that you start with all of the changes made by both you and others. To do a refresh:
1. Make sure that you have defined an 'upstream' remote in your local repo using the command:
   \`git remote add upstream https://github.com/Chingu-cohorts/pmrok.wiki.git\`
2. If you are unsure if you have defined this remote you can display all remotes in your local repo using the command:
   \`git remote -v\`
3. To pull changes from the PMRoK Wiki to your local "mirror" repo checkout your working branch in your local repo and then pull the contents of the upstreams \`master\` branch into it before making any changes.
\`\`\`
   git checkout <working-branch>
   git pull upstream master
\`\`\`


### Making a Change
1. Create a new working branch with a descriptive name. For example, \`fix/softskill-url\`. Any changes or additions to make should be made to this working branch.
2. Refresh the repo with the latest version of upstream/master as described above.
3. Make your changes. Remember to issue frequent commits if you are making multiple changes so there is a detailed trail of each change you've made.
4. When you are ready to share with others or if you just need to ensure that your in progress work
is backed up push your changes to the \`pmrok-chgmt\` repo using the same working branch name. For example, \`git push origin fix/softskill-url\`.
5. If you should need to refresh your working branch from GitHub simply
\`git pull origin <working-branch>\`.
6. When your changes are completed you can start the process of promoting them to the wiki by
creating a PR to merge your changes into the \`development\` branch. Be sure to select \`PMCAB\` as
the reviewer and once changes have been reviewed and approved you will be responsible for
performing the merge.
7. Once your change has been merged into the \`development\` branch it will be ready to merge into
the \`master\` branch along with changes submitted by others. A member of the _PMRoK Change Approval
Board (PMCAB)_ will periodically create a PR to promote all changes from \`development\` to \`master\`.
8. Merging into \`master\` by a member of the PMCAB will automatically start the TravisCI integration
script to move changes to the PMRoK Wiki.
9. Once the TravisCI integration script has completed the approved changes will be available to
all users of the PMRoK Wiki.

If you are curious about the _Change Approval Board_ process it is a concept that's part of the
[Information Technology Infrastructure Library](https://en.wikipedia.org/wiki/ITIL), which is a
set of best practices for managing IT infrastructure assets.

    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "About Voyages", title: 'Voyage Roadmap',
    content: `At Chingu, we build to learn. Below is the project roadmap for teams:

![Voyage Roadmap](https://github.com/Chingu-cohorts/pmrok/blob/development/diagrams/Voyage%20Roadmap%20Diagram.png)

# Chingu-Voyage Build-to-Learn Roadmap

| Act   | Focus           | Task | Description    |
|:------:|:----------------|:----:|:---------------|
| **Act 1** | **[Project Setup](#act-1---project-setup)**   | #1   | Meet Your Team |
|       |                 | #2   | Set Goals & Expectations |
|       |                 | #3   | Brainstorm Project Ideas |
|       |                 | #4   | Define Your Workflow |
|       |                 | #5   | Setup Your Development Environment |
|       |                 | #6   | Define Your MVP |
| **Act 2** | **[Development Sprints](#act-2---development-sprints)** <br>(repeated for each Sprint) | #1   | Plan the Sprint |
|       |                 | #2   | Start the Sprint |
|       |                 | #3   | Team Standup Review |
|       |                 | #4   | Team Progress Review |
|       |                 | #5   | Code Review & Merge |
|       |                 | #6   | Completed Sprint Review |
| **Act 3** | **[Project Closure](#act-3---project-closure)** | #1 | Tidy up your code & project structure |
|       |                 | #2   | Polish the User Experience |
|       |                 | #3   | Deploy It! |
|       |                 | #4   | MVP #1 - Share it with trusted & experienced colleagues |
|       |                 | #5   | MVP #2 - Share it with the World! |
|       |                 | #6   | Project Retrospective Meeting |
|       |                 | #7   | Document the Experience |
|       |                 | #8   | Voyage Completed! |

# Act 1 - Project Setup

## #1 - Meet the team

*Goal*: Get acquainted with your teammates.

*Suggested Actions*:

> Read each other's intro stories.

> Share a project or two you are most proud of in your learning journey.

> Share some prime picks from your gif collection.

*Icebreakers*:

> What time zone are you in?

> What sort of music do you like to code to?

> What is your preferred learning style (videos, docs, dialoge etc)?

> What are your favorite YouTube channels, subreddits or blogs?

> What technologies are you most comfortable using and explaining?

> What technologies are you most interested in learning this Voyage?

## #2 — Set Goals & Expectations

*Goal*: Determine the team's learning expectations and availability.

*Commitment*:

> It is critical to make sure that everyone is realistic in their level of commitment and availability.

> Working less than you commit to is disrespectful to your teammates and can stunt the team's progress and morale.

> Typically team members commit 4-10 hours a week towards the project.

*Learning Goals*:

> Evaluate everyone's current technical abilities.

> Determine at least one primary technical learning goal for each teammate

> Pick something that is 25% outside of the team's comfort zone / skillset.

> Any further and you will likely be overwhelmed.

> Any less and you are limiting your rate of learning.

*Voyages go by faster than you think and you need to focus on learning through building rather than getting caught in research rabbit-holes*.

## #3 — Brainstorm Project Options

*Goal*: Decide on a project to pursue.

*Tips*:

> Stay focused on what is possible as a balance of the cohort season's length, team experience and the commitment
level.

> Remember to incorporate as many team learning goals as are feasible.

> *The goal is to learn something new not to stay stuck only working with what you know.*

*The Stack*:

> Front End - consider the library / framework your project will use

> Back End - consider the backend language and library / framework

> Database - consider the database type and ORM your team will use to interact with it

*It is better to underpromise and overdeliver _especially if this is your first Voyage_*


## #4 —Define your Workflow

*Goal*: Decide on which workflow tools the team will use.

*Tips*:

> Don't go overboard! Workflow tools are only useful when they are used. Keep it simple so that using the tools
feels effortless rather than a chore.

> If you don't already have a workflow or specific tools in mind consider the suggestions below.

*Suggested Workflow Tools*

>Besides the obvious Slack and Github the following are tools that work for many Chingu teams

> [Waffle](https://www.waffle.io) - Trello and Github had a baby that makes project management a breeze

> [Discord](https://www.discord.com) - "Always-on" communication tool. Leave it on mute while you work then unmute
as needed to gain access to team mates for problem solving detours. Use it for clear audio while using Google
Hangouts (don't forget to mute the echo from Hangouts!)

> [Google Hangouts](https://hangouts.google.com) - A screensharing / pair-programming must (until VSC Live comes
out!!)

*Suggested Use*:

> Hold a meeting on Discord and / or Hangouts to discuss the key steps required to complete the next sprint.

> Use Waffle to compartmentalize the steps of the sprints into grab-and-go tasks.

> Leave Discord on and unmute as needed to discuss and conquer roadblocks.

> Use Slack for short code snippets. Use Hangouts to screenshare for more complex debugging.

*A proper workflow and concise collection of workflow tools is what makes the difference between a team that makes it and one that doesn't.*

## #5 — Set up

*Goal*: Set up and explore your team's workflow tools.

*Tips*:

> Check to see if your pre-made Voyage team repo is functional and the proper permissions and settings are
configured.

> Ask for help from the community with setting up tools if you get stuck.

> Don't get turned off because the setup seems daunting. It's a one time process - take the time to do it right!

*Required*:

> Make sure everyone uses the tools.

> Walk through an example usage of each tool and how they all come together.

> Work out any kinks in people's microphones, internet connections, permissions etc.

*The first sprint IS NOT the time to learn how to use the tools at hand.*

*Get comfortable early so you can focus on building not technical difficulties!*

## #6— Define the MVP

*Goal*: Hold a meeting to decide on the minimum viable product (MVP).

*Tips*:

> Deciding on the MVP for the project is the most important step your team must take before embarking on your
Voyage.

> Consider the features that can together serve, at minimum, as a functioning prototype of the project's vision.

> Defining the MVP is committing to the bare minimum you and the team will accomplish before the cohort deadline.

*Focus Points*:

> Front End - consider the views and their associated functionality

> Back End - consider the endpoints, routes and associated logic

> Database - consider the complexity of the database and associated models

> Deployment - consider how / where you will host the project

*Schedule a Meeting*

> Schedule your next meeting to plan your first sprint!

*Don't throw away those features and moonshot ideas that fall outside of the scope of the MVP!*

*Shoot for finishing the MVP ahead of schedule so the extra time can be used to implement those additional
features and polish*
----

# Act 2 - Development Sprints

## Plan the Sprint

*Goal*: Subdivide the MVP into a feature(s) sprint.

*Notes*:

> Determine a starting point for working towards the completion of the MVP.

> The tasks for each sprint *should require 1 week or less to complete*.

> Do your best but don't worry if you underestimate the required time - you can reflect and adjust in the next
sprint.

*Tips*:

> Select one or more top-level features from the MVP and explore how it can be broken down into individual tasks.

> Think about the order in which the tasks will be completed and mark those that can be worked on independently or
in parallel.

> The team should take ample time to explore the sprint and all of its tasks. Everyone should be aware of the
sprint on a conceptual and somewhat of a technical level.

> High level implementation details can be discussed but don't lose time writing out any code or specific details.

> Finer details and coding will take place after the sprint has been thoroughly explored.

*Workflow*

> Now is the time to create cards for each of the tasks.

> Write the cards by adding descriptive titles and core details of the task as bullet points.

> The cards should serve as guidelines to each task with links to key references or specific notes that may be
forgotten.

> Finish by reviewing and assigning the cards together as a team so that everyone is on the same page and knows
what they are responsible for.

*Don't spend too much time writing the cards or getting caught up with all the fancy buttons!*

## #2 — Begin the Sprint

*Goal*: Turn all that talk into code!

*Tips*:

> Communicate when you're stuck. Don't stare at a screen alone.

> Everyone is here to learn - be patient with each other and encourage open discussion and brainstorming solutions
to roadblocks.

> Use the help channels and friends from other teams to resolve complex issues if your team is stumped or
unavailable.

*Schedule a Meeting*

> Schedule a time a few days from now to check in with everyone and make sure forward progress is being made by
the team.

*Remote dev work is hard especially for beginners. Communicating openly and readily can make the difference
between meeting a deadline or losing momentum.*

## #3 —Team Standup Review

*Goal*: Review the team's progress on the sprint.

*Tips*:

> Start by assessing everyone's status in the sprint.

> Discuss any roadblocks that are holding back progress.

> Explore solutions together and construct an actionable plan to move forward.

> Celebrate completed tasks and share the lessons learned in working on them.

> Assess the remaining tasks and take note of how close you are to meeting this sprint's weekly deadline.

*If anyone learned anything particularly valuable or overcame an irritating block be sure to share the experience in a Medium blog or discussion in the Chingu chat.*

## #4 — Sprint Progress Review

*Goal*: Review the team's progress on the sprint.

*Steps*:

> Assess everyone's status in the sprint.

> Discuss any roadblocks that are holding back progress.

> Explore solutions together and construct an actionable plan to move forward.

> Celebrate completed tasks and share the lessons learned in working on them.

> Assess the remaining tasks and take note of how close you are to meeting this sprint's weekly deadline.

*Tips*:

> Make sure that everyone is testing their code along the way.

> During the next phase of reviewing and merging the code no glaring issues or immediate bugs should be present.

> Take ownership of your tasks and make sure they have been vetted before moving onto the next one.

## #5 — Code Review & Merging

*Goal*: Review the code and merge into the development branch.

*Tips*:

> Cross-review each other's code and prevent merging without review.

> Engage in thoughtful disagreement by challenging each other respsectfully.

> Ask for clarification and add comments wherever needed.

> Openly explain decisions and implementation details.

> Test completed tasks whenever possible and seek out bugs to catch.

> Work on maintaining a consistent style across the team's code. Let it come organically or use a linter rules
such as AirBnB or Google.

*Write detailed pull request notes to maintain a clear history of the project and its progress. These will also help team members cross-review your PRs*

## #6 — Completed Sprint Review

*Goal*: Go over the sprint and reflect on the experience gained.

*Steps*:

> Assess the number of remaining tasks

> Determine why they were left incomplete

> Discuss how the next sprint will be improved by factoring in the lessons learned

> Discuss how the workflow worked to or against your team's advantage

> Discuss any new ideas that stemmed from completing the tasks. Create notes or cards to keep these ideas handy
for the future.

*Be patient with each other and understand that it's okay to miss a deadline. Carry over the remaining tasks and plan better for the next one!*

Note: Repeat sprints until the project MVP is complete.

# Act 3 - Project Closure

## #1 - Tidy up your code & file structure

*Goal*: Have a codebase that you can look back on proudly in a few months and still understand what you were doing.

  When your code is clean, well structured, and *DRY*, you can easily share it with other programmers, possible employers, and future teammates.

  *Tips*:

  > Remove extra and unnecessary \`console.log(...)\` statements.

  > Comment your code thoroughly. (If you're using Javascript, consider the JSDoc pattern.)

  > Factor out any repetitive pieces of logic. Try to use more generic functions. (*Be careful!:* Don't make
things too generic! It could make the code harder to understand.)

  > Use common file & folder structures and established community best practices in design patterns.

  *DRY* (*D*on't *R*epeat *Y*ourself): Try to factor out portions of your logic into reusable functions, classes, and components so as to avoid repeating yourself. Code that is factored this way is said to be *DRY*.

  *IMPORTANT:* After modifying your code, make sure you test it thoroughly so as to make sure you didn't break anything!

## #2 - Polish the experience

 *Goal*: Add the finishing touches to make this project really shine! This is where (if you have the time) you can go that extra mile.

  An optimized experience reflects well on your abilities and increases the credebility of the project.

  *Tips*:

 > Make it fully responsive and check your design on common screen sizes.

  > Make your methods and logic more efficient.

  > Decrease the size of what is downloaded by the user (At least on first load.)

## #3 - Deploy it!

*Goal*: Make your project publicly accessible.

  Once you deploy your project you can then share it with others so that they can review and use it. This is especially useful when you want to get feedback or just when you want to perform some user tests. Deploying is also useful because it allows you to provide a link to a live demo version on your resume and your portfolio.

  *Tips*:

  > Consider a simple, managed hosting service like Heroku or Google App Engine.

  > Don't worry too much about infrastructure design, just use the most basic setup possible so as not to run into
issues.

  > Search online for deployment strategies that match your stack and your use case. You will find many articles and tutorials with step by step guides on how to deploy your favourite stack on a popular managed service.

## #4 - Share it with trusted & experienced colleagues

*Goal*: Gather important feedback and perform some basic user testing.

  Sharing your project with peers is an extremely helpful way of gathering useful feedback. This could be feedback on the experience of your app or feedback on the actual code. You can then use this feedback to further polish the experience. Another benefit to having many people use your application is that you are more likely to catch bugs.

  *Tips*:

  > Share your project on chingu in #community-chat and ask people to check it out.

  > Share it with programmers you personally know such as friends, classmates, or work colleagues.

  > Don't explain the application too much. Just give them the basic idea and let them figure out how to use it.
If they can't figure out how it works or if they are stuck on something then there is probably something wrong
with the experience.

## #5 - Share it with the world

*Goal*: More feedback and testing!

  When you share your project publicly you are likely to get even more useful feedback and catch more bugs since your audience is now much larger and more diverse. This also adds to your 'online presence' which is extremely valuable when applying for jobs.

  *Tips*:

  > Write a medium article announcing the project and asking people to try it out.

  > Share it on social media (Facebook, Twitter, etc.) and even on professional networks such as linkedin.

  > If you are part of any other technical/hacker communities consider sharing it there too.

  > Make sure the tier of hosting you are using is ready to handle the additional traffic.

## #6 - Retrospective meeting

*Goal*: Solidify the experience and look back on everything you have accomplished.

  Organize a meeting with your team to discuss everything you have worked on, the outcome you have reached, the things you have learnt, your experience, and maybe even discuss the future of your project if you would like it to continue. Take this as an opportunity to compliment and, *more importantly*, critique each other. This will help you improve your soft skills and also provide your teammates with important feedback that they can also use to improve themselves.

  *Tips*:

  > Discuss the highs and the lows. Discuss the reasons behind the lows.

  > Give honest and critical feeback but don't be unnecessarily mean.

  > Take feedback from your teammates with an open mind. Don't be quick to snap or defend yourself. Use this as an
opportunity to grow.

## #7 - Document the experience

*Goal*: Increase your online presence and practice writing about your experience.

  Write about everything. Not just the actual project but also your experience, your thoughts, and your teammates. This is helpful because as you move forward in your career as a programmer you will have points of reference to look back on to see how you have grown not just technically but also in terms of soft skills.

  Getting into the habit of writing a lot will help you increase your online presence and ultimately improve your chances of getting a job.


  *Tips*:

  > Document everything regarding the experience.

  > Have your teammates review it before publishing. They might catch something you have forgotten.

  > Share the article with your peers and with the public to increase your online presence.

## #8 - The Voyage is Complete

    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "About Voyages", title: 'Voyage Workflow',
    content: `As a PM in a Chingu Voyage, you'll have access to lots of support.

You can gain support via the community (slack-channels: #project-managers, #ask-for-help, #resources-treasure, #community-chat), from facilitators (Weekly Check-ins, Repair Days), or by making an issue in this repo's [issue section](https://github.com/Chingu-cohorts/pmrok/issues) or in the comment section of your Weekly Check-in.

In addition, your team will use the Wizard tool, which provides both structure and a clear roadmap with tips, explanations and resources. The Wizard tool will also have a Standups functionality to help keep your team communicating and active.

Below is a brief overview of how Chingu volunteers will support PMs:

### The Voyage Workflow

1. **Weekly Check-in** - The weekly check-in with Chingu will be sent out to all members at the start of every week and will be our way of assessing team health and to help you be accountable to your learning and team.

2. **Weekly HeartBeat powerup** - HeartBeat is our tool to determine what teams need support. We use the Weekly Check-ins as well as slack & github metrics to give every team a status of:

   * GREEN (progressing well)
   * YELLOW (may need some support)
   * [RED](https://giphy.com/gifs/cat-fire-rescue-phJ6eMRFYI6CQ) (team is in trouble, may need significant support or to be closed down)

   Right now it is largely done manually, but Chingu's Lead Data Scientist @trion is currently working a machine learning-assisted tool to help automate this process. It's a time consuming process and part of the reason the Weekly Check-ins are so important. I (Chance) will spend Monday-Wednesday powering up the HeartBeat before...

3. **Team Support Day!** - This day will happen every Thursday/Friday (and Saturday if need-be). We will use the insights from HeartBeat to determine what teams need assistance each week. Anything from troubles gaining momentum to looking for a replacement for a member who got a job, this day is for making sure teams are on the right path.

It's also worth noting that we are continuously looking for ways to improve Chingu and we will be looking for patterns with teams that reach Yellow and Red so we can find the root causes to improve the system for the next round to of teams. 🚀

### Community Support

Each Chingu Voyage has a few hundred developers from all levels who come from diverse backgrounds. Viewed as a collective brain, each Voyage is both a marvel of diversity and an excellent resource for you and your team. I encourage all teams to consider the collective brain of the Voyage as a team-mate.

You can access this collective brain in the following ways:

* **Slack channels** - #ask-for-help-here, #community-cht, #Project Managers, #resource-treasures
* **Weekly Check-ins** - there will be an opportunity to let us know of any improvements or ask for help on this check-in. For example, if you say your team needs help with Auth0, we may be able to find someone to send your team's way to help.
* **Chingu Medium Publication** - Every week Chingu will publish a Weekly Update on the Chingu ecosystem and all the wild projects & news from Chingu members.
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Managing a Project", title: 'Project Manage Concepts',
    content: `## What is a PM?

An Agile PM is responsible for managing the resouces, time, and scope that
make up a project to ensure that a quality product is delivered within the
desired schedule and budget. A Chingu PM doesn't just coordinate the project.
She also acts as a member of the development team writing code, testing the
app, and creating documentation.

An important difference between a PM in a corporate setting and yourselves is
that since we are operating in a volunteer environment, just like every Open
Source project, you are also a coach, a motivator, and a role model. We can't
order our team mates; We must establish an environment that motivates them to
be both innovative and productive.

In your role as a Chingu Project Manager, your most important two tasks are to
understand your team's needs and to remove any obstacles blocking their progress.
This requires a large amount of communication and a deep understanding of what
resources, including people, are available in the Chingu organization.

# How can I define and assign tasks to my team?

## Introduction

When you start a new project, one of the first things you'll need to do is to define the tasks that must be completed to meet the project's goals. As a PM, the very first step is to brainstorm with your team to define who your users are, the value the app will bring to each of them, and the high-level components of the app responsible for delivering this value.

## Workflow
Once you've done this, the next step is to start defining more discrete tasks and adding them to your project backlog. What is a "backlog"? Very simply, it's just a place where you maintain the tasks your project needs to complete, but which haven't yet been started. Agile projects organize themselves around a project board that consists of the following vertical lanes:

- Backlog - The stories we know we need to do, but haven’t gotten to yet.
- Next - The stories we know need to be performed in the next Sprint. If we complete all the stories in the current sprint, we’ll go here to get more work before dipping into the backlog.
- In Progress - The stories that have to be completed in the current Sprint. Don’t overload this with stories! At the beginning of the Sprint, you’ll need to decide as a team what needs to be done in the upcoming sprint.
- Blocked - Stories that have been started, but can’t be completed due to an unfulfilled dependency on another story, or due to a decision that needs to be made, or a technical issue. These should be resolved as quickly as feasible so you don’t accumulate technical debt.
- Done - Stories that have been completed. It’s important to move a story card to this lane only when the story is fully completed - coded, tested, and promoted to your release branch.

This is also known as a Kanban board and it imposes a workflow to your project that gives you visibility to the progress of the project based on the state of its tasks.

-----

### Agile vs. SDLC Project Management - What's the difference?

Once you have an idea of what very high-level components make up your project, you will need to start defining the tasks that must be completed to build them. In traditional Software Development Lifecycle (SDLC) project management methodologies, the result was called the *_work breakdown structure (WBS)_*, which was typically just a list of the tasks, their relationship to one another, and estimate of time for completion, and who they were assigned to. In SDLC all tasks were defined at the start of the project, allowing the project manager to provide an accurate estimate of cost and target date for the project. However, over time it has been proven that for many types of projects this highly structured and rigid approach simply doesn't work.

Agile project management (of which Scrum is one methodology) is based on the fact that "you don't know what you don't know" at the start of the project and as you progress, more details will surface that you'll need to react and adapt to. Agile methodologies are based on the following principles which contrast them to traditional SDLC approaches:

- Individuals and interactions over processes and tools
- Working software over comprehensive documentation
- Customer collaboration over contract negotiation
- Responding to change over following a plan

    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Managing a Project", title: 'Your Sprints',
    content: `## Sprints

With an Agile approach you will divide the time between the start of your project and its delivery date into *_sprints_* of equal duration in which you'll be completing tasks. At the start of each sprint you and your team will review the backlog and choose the tasks that must be completed in the new sprint. If you complete all of these before the end of the sprint then you'll start new tasks, one-at-a-time, from your backlog to fill the remaining time.

Remember that the goal of a sprint is to develop and release a set of capabilities that users could theoretically use. This doesn't mean that the app will have all the necessary or requested features at the end of the first sprint. Rather, Sprints build on one another throughout the life of the project until all major features have been implemented. This is the core of the agile approach and allows the team to get useful feedback throughout the project rather than just at the final product release.

Dividing your project in this way and planning and executing in a progression allows the team to adapt to change and to start tasks at the optimal point in time when enough details are known to allow development to be both efficient and result in something that is relevant.

## What Are the Milestones in a Sprint?

![Sprint Milestones](https://github.com/Chingu-cohorts/pmrok/blob/development/diagrams/Sprint%20Milestones.png)

Sprints are application development cycles having a duration of one week each. The sprint length is fixed across the life of the project and a fixed number of user stories are assigned to each sprint. This is not to say that stories cannot be added to the sprint. Just that they can’t be added if doing so exceeds the capacity of the team to create, test, and deploy a working application by the end of the sprint. It is quite often the case that teams under estimate the number of stories that can be completed and have to add stories to fill out the remainder of the sprint.

As previously mentioned, sprints build upon one another. With each sprint, the usability and value of the product increases as features are added and refined. Even though sprints result in a deployable application, users may choose not to use it in production until it reaches a certain minimum threshold of feature and functionality. However, having a working application increment helps to demonstrate progress and solicit customer feedback at the end of each sprint.

### Sprint Planning

At the start of each sprint the PM defines a goal for the sprint and identifies which stories need to be completed to achieve it. The Project Team selects stories from this pool, reviews them, and commits as a team to their completion. This includes considering both the individual and collective complexity of each story using story points. One outcome of the review may be that the goal needs to be decomposed across multiple sprints if it exceeds the capacity of the Development Team

The team also plans for how they will work together to complete the sprint. This may include discussions around risks and contingencies, test plans, etc. An option available to the Project Team is to pair members of the team to work on certain stories. For example, it may be advantageous for a frontend developer and a backend developer to pair with one another to ensure that API’s are well established.

### Sprint Standup Review & Sprint Progress Review

During the course of a sprint the Project Team gathers daily for a 15-minute meeting to report progress and roadblocks. Meetings of this type are referred to as the Daily Scrum in the Scrum methodology. In Chingu Voyages they are referred to as the _Sprint Standup Review_ and the _Sprint Progress Review_.  Their purpose is for each member of the team to review what was accomplished towards the sprint goal since the last meeting, what is to be accomplished by the next meeting, and to identify any obstacles. The goal of this meeting is to make sure that there is transparency across the team to both successes and roadblocks.

These are not intended to be meetings where issues or problems are to be solved during the meeting, but to expose them to the entire team and for teammates to schedule time to work on them. This allows the proper resources to be brought to bear so the time of other teammates is not wasted. Desired behaviour on the part of the team is for individuals to volunteer to help rather than resources being explicitly assigned by the PM.

### Code Review & Merge

At the end of each sprint, a Code Review is conducted to walkthrough the working product and to merge it into the project's \`master\` branch. This meeting is an opportunity to get feedback on the state of the product, discuss issues and possible changes or new features, and to decide on what to do next.

### Sprint Retrospective

The Sprint Retrospective is conducted by and for the Project Team to promote continuous improvement. It is the primary means the team uses to improve their work and to drive value not just for the customer, but also for themselves in the form of a more integrated and smoothly operating team.

This is an inward look by the team at how they performed during the last sprint and an opportunity to identify changes for the next sprint. This isn’t just about technology and tools, but also about procedures, interactions between people and roles, and successes and failures. The goal is to improve by implementing “midstream” corrections at the point they are needed.
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Managing a Project", title: 'Conducting an MVP',
    content: `TBD
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Managing a Project", title: 'Project Closure',
    content: `TBD
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Managing a Project", title: 'Using the Wizard',
    content: `## Using the Wizard

**_This section is under development_**

The Wizard is a Slackbot used by Chingu Voyage PM's to manage their projects
and post status of their teams and projects.

To use the Wizard enter one of the commands below in the message box in your
teams Slack channel.

- \`/team map\` will directly open the Voyage Map.
- \`/team next\` will directly open the Next Milestone
- \`/team standup\` will directly open the Team Standups view (with the option
to log a new standup)
- \`/team progress\` will continue to display the progress buttons

Teams now have the ability to view their *Voyage Map* using the
**_[Voyage Map]_** button. This map will display team data and milestone
progress.

The **_[hide]_** button will now return the view to the \`/team progress\`
buttons so you can quickly navigate between the different tools without
blocking up your conversation.

    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Guidance>Situational Guidance", title: 'Building the Project Backlog',
    content: `## Sagas, Epics, & User Stories

It is often helpful to categorize stories as sagas, epics, and stories to reflect differences in their scope and lifespan.

### Sagas

Sagas are “big picture” requirements that are extremely broad in their scope. An example of a saga might be:

“As a: end-user I want to: use an application that has exceptional performance and responds to my requests within a matter of seconds So I can: quickly complete my work and stay focused on my immediate task.”

This type of requirement is very broad in its scope and sets an expectation for all functions in the application. As such, every feature and unit of functionality must take it into consideration. This means that multiple epics and stories will be based on this type of saga. Sagas typically have a long life and while they must be adhered to they are not fully completed until all lower level epics and stories rooted in them are finished.

### Epics

The next type of story is an epic. Like a saga, epics have a lifespan of multiple sprints and cannot be considered complete until all stories based on them are also complete. However, epics have a narrower focus than a saga and although still broad in nature, they can be completed within a few sprints. For example,

“As a: content-contributor I want to: categorize the content I create So I can: ensure that readers can easily locate it”.

This type of requirement will result in multiple stories defining how content categories are defined and maintained, how they are associated with content, and how search functions utilize them.## User Stories

### Stories

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

This has been a very light introduction to Agile project management and has been focused on practical steps to get your project to the point where you can start Sprint 1. Just as there are many paths to failure there are also many paths to success. As Chingu PM's its your responsibility to share what you've learned with your peers. Feel free to add your lesson's learned to this wiki.

Good luck on your projects!
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Guidance>Situational Guidance", title: 'Managing Application Secrets',
    content: `Every application has certain secrets, such as build instructions, passwords and SSH keys that could compromise the security and confidentiality of the app if made public. It is the responsibility of the Project Manager to ensure that these are maintained in a secure location and are available to a minimum of two team members. After all, given the fluid nature of team membership you don't want to wake up one day to find that no one on the team has access to the Production server.

Please note that the Guidelines presented below are sufficient to protect most private and commercial secrets, but are NOT sufficient for apps supporting many government departments and agencies such as the U. S. Department of Defense.

## Guidelines

- Assume that your team will forget the app secrets from time-to-time. Keep them in a secure place so you'll be able to produce them on demand.
- Never store confidential information in a public source code repository like GitHub.
- Set up a secure vault for the sharing of app secrets. For example, a tool like 1Password with strong encryption so you can store the password vault in a Cloud storage location without fearing that it can be easily compromised.
- Make sure that all members of the team use \`.gitignore\` to ensure that service accounts and passwords stored in local \`.env\` files are never pushed to the remote Git repo.
- Never communicate secrets through email. Use a realtime messaging service like Slack that encrypts the transmission of data. However, if you must use email use separate email messages for the name of the service, the account id, and the password. After sending the messages delete them from your local computer and if supported from any server-based components as well (like Slack channels).
- Never communicate secrets outside of your team. Always double check the recipient list prior to transmission to ensure that it will be sent only to authorized recipients.
- Never write secrets down on paper. Never write secrets down on paper. Never write secrets down on paper. Never write secrets down on paper. Never write secrets down on paper. Never write secrets down on paper. GOT IT?

## Techniques

One option for protecting application secrets is to take them out of your code and place them in environment variables. In a local \`dev\` setup you can place these in a \`.env\` file, which should be added to \`.gitignore\` to prevent them from being exposed in GitHub. Using the \`dotenv\` library makes this easy.

In a production setting, like Heroku, you can set these environment variables through the dashboard.

-----
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Guidance>Situational Guidance", title: 'Managing Team Documentation',
    content: `One of the foundations of the [Agile Manifesto](http://agilemanifesto.org/) is that Working software is valued over comprehensive documentation. This has led to the misconception that Agile methodologies, like Scrum, produce only code and not documentation. In fact, Agile methodologies promote the production of documentation at the right point in time and at the right level of detail.

Generally speaking the "right point in time" is when the necessary details are stable enough to produce documentation that will not require later revision. You may need to keep notes as your sprints progress so you'll have the information you need to create usable documentation, but you won't create that documentation until the details have been defined and are stable.

The "right level of detail" means that you don't want to create documentation just for the sake of producing documentation. Your goal should be to produce just the documentation users need and no more. It also means that what you produce must be concise and to the point. Diagrams and pictures are generally used to convey information the user needs to know with words used sparingly.

As an example consider the following diagram produced by @zashishz for the Voyage3 Toucans-26 team to document their Git workflow.

![Team Git Workflow](https://github.com/Chingu-cohorts/pmrok/blob/development/diagrams/Git%20Workflow%20Diagram%20Example.png)

This diagram shows the reader everything he or she needs to know regarding how they are expected to conduct their day-to-day development tasks with respect to Git and GitHub.
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Guidance>Situational Guidance", title: 'Managing Issues & Requests',
    content: `# Introduction
The PMRoK Project uses GitHub not only for source code management, but also for issue reporting. The purpose of the following guidelines is to provide guidance on how to report an issue. You might be asking yourself "How hard can this be?". You might be surprised to find out how often bad issue reports are actually created. Here are some examples:

- "The profile screen doesn't work right. Please correct this asap."
- "When I hit the Option-B key combination nothing happens."
- "Damnit how many times must I ask for this frigging software to work right. On the account entry screen the phone number textbox doesn't accept a country code"

The problem with the first two examples are they don't describe what the error actually is or where it's occurring within the application. The second example is marginally better since it defines how to recreated the problem, but that information is useless since there's still no indication of which screen the user was on when Option-B was attempted.

The last issue report is the best of the three since it defines which screen the user experienced the issue on, what she was trying to do, and what the expected outcome was. Unfortunately the first sentence is totally useless information that's inappropriate for an issue report and sends a signal to whoever works on this issue that the user is going to be difficult to work with. The lesson here is that issue reports should be factual and not emotional.

# Issue Reporting Template
The result of having the complete, accurate, and appropriate information is that the Developer will be able to resolve the issue faster and more correctly. The key information that should be entered into the issue are:

- Description of what occurred and what the desired outcome should have been.
- Summary of the symptoms including screenshots and logs, if available.
- List of steps the Developer can follow to recreate the problem. This should include not only navigation steps, but also data values that are to be entered.

The information above should be entered by the individual that report's the issue. When the issue is resolved the Developer is responsible for describing how the issue was resolved along with any supplemental information that may be useful to other Developers if the issue should reoccur in the future.

To help ensure that this information is properly captured we ask our users and developers to use the following template when creating issues for PMRoK. Simply copy and paste this into new issues and then enter information about your issue in the appropriate section.
\`\`\`
**_Issue Description & Expected Outcome:_**

**_Symptoms:_**

**_Steps to Recreate:_**

**_Resolution:_**
\`\`\`
# The Importance of Labels
Having the complete and accurate information that describes an issue is important, but so is classification of the issue. Classifying or grouping issues into categories helps the Development team to triage issues so they are worked on in the proper order.

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

# Examples
The best source of examples for how issues are to be defined and labeled is the [PMRoK Issue Log](https://github.com/Chingu-cohorts/pmrok/issues).
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Guidance>Situational Guidance", title: 'Dealing with "Analysis Paralysis"',
    content: `The short duration of Chingu Voyages requires that teams strike a delicate balance between performing quality work, learning new things, and completing the project. This is made even more import by the fact that team members typically have responsibilities outside of their Voyage project such as family obligations, jobs, and school which can create more stress. The objective of the Voyage is to learn and not increase stress.

## Setting Your Goals & Expectations

The first step to take in preventing any form of "analysis paralysis" is to determine the team's learning expectations and availability. It is critical to make sure that everyone is realistic in their level of commitment and availability. Working less than what you have committed to is disrespectful to your teammates and can hinder the team's progress and morale. As a rule-of-thumb (ROT) team members can typically devote 4-10 hours a week towards the project depending on individual situations.

The second step is to evaluate everyone's current technical abilities and determine at least one primary technical learning goal for each teammate. Pick something that is 25% outside of the team's comfort zone / skillset.
Any further and you will likely be overwhelmed, while any less and you are limiting your rate of learning.

It's always a good idea to ensure that at least one team member is familiar, even at a cursory level, with each component of the technical stack you've chosen for your project. Voyages go by faster than you think and you need to focus on learning through building rather than getting caught in research rabbit-holes.

What follows are various situations that can impair your teams ability to complete their project, which in turn can also increase stress on the team. As a PM it's your job to recognize the warning signs for each of this and to take the necessary steps to correct them or to mitigate their impact.

## Case #1: "Too Much New"

Some teams have a tendency to over commit to the amount of new technology they choose to include in their app. This includes frontend libraries and frameworks, CSS libraries, database management systems, object relational mappers, and a whole myriad of development and runtime technologies.

### Symptoms
1. _Danger_: Technologies in the project stack which no one on the team has any experience using.
2. _Warning_: User story uncompleted for more than 1 sprint
3. _Danger_: User story uncompleted for more than 2 sprints

### Preventative, Corrective, or Mitigating Actions
1. There is an adage stating "You can't manage what you don't measure". Defining the technology baseline for your team will help you to recognize with the teams capabilities are being strained.
2. Ensure that at least one member of the team is acquainted with each component of the stack and than individual team members don't exceed their capability (the 25% rule) to absorb new technology
3. Measuring the rate of story completion for each sprint and projecting the impact on project completion.
4. Tracking user stories that are unresolved across multiple sprints. The root cause of team members who are unable to complete their stories across more than two sprints could be, but isn't limited to, too much new technology.
5. At some point you may need to step in and request in more strenuous terms that more "tried and true" technologies be used. It should be stressed to the team that the stories that include new technologies may always be re-attempted once the app is working and as time permits.
6. Reach out to other Chingus in Slack when you need help.

## Case #2: "Perfection is the enemy of Good"

One of the great traits of Chingu teams is they are driven to stretching their capabilities to learn new technologies and to deliver quality applications. These are admirable attributes, but it's important that teams not sacrifice completing a project at the expense of striving for perfection.

### Symptoms
1. _Warning_: User story uncompleted for more than 1 sprint
2. _Danger_: User story uncompleted for more than 2 sprints

### Preventative, Corrective, or Mitigating Actions
1. Make sure that user stories are granular and are achievable within 1-to-2 sprints. The majority of your stories should be able to be completed in a single sprint with only a minority that span sprints. Remember that stories build on one another across sprints. Features don't have to be perfect in one sprint.
2. Measuring the rate of story completion for each sprint and projecting the impact of delays on project completion.
3. Tracking user stories that are unresolved across multiple sprints and reviewing progress with the team in your Standup Meetings. Team members with over due tasks should volunteer to discuss their status and if they need help. If they don't it's your responsibility as the PM to bring this up and to ask others on the team to help resolve the blocking issue.

## Case #3: "The Bright Shiny New Object"

This case is similar to "Too Much New" except it describes the situation where a teams progress is held back due to switching technologies in the application stack. Essentially chasing new technologies at the expense of getting anything done. Although there may be good reasons for a mid-stream change to the application stack, given the short duration of Chingu Voyages changing components should be seriously questioned once development is underway.

### Symptoms
1. _Warning_: Team members unable to agree on which components will make up the apps technical stack.
2. _Warning_: No clear agreement or decision on the technical stack
3. _Danger_: Composition of the technical stack not 100% defined in Sprint 2.
4. _Danger_: Changes proposed to one or more parts of the technical stack after Sprint 3.

### Preventative, Corrective, or Mitigating Actions
1. As part of both Sprints 1 & 2 educate your team on the importance of defining how the team will operate during the Voyage and the implications of changing parts of the stack after development begins.
2. If a change to the stack is proposed after Sprint 2 - Design work with the team to ensure that there is sufficient justification for the change and the impact it has on completing the project on time is fully understood.
3. Changes proposed after Sprint 5 should be challenged since this is the midway point in the Voyage's development cycle.
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Guidance", title: 'Managing Conflict',
    content: `This section is intended to provide information and guidance on a variety of
situations stemming from team dysfunction. This information tends to be both practical and
opinionated. However, don't hesitate to share your experiences and to make
suggestions for how these can be improved by opening an [issue](https://github.com/Chingu-cohorts/pmrok/issues).

## Unresponsive Team Members

One of the most frustrating situations you'll face as a Chingu PM is when members
of the team don't respond to requests from you or others on the team. One of the
obligations shared by both PMs and team members when they sign up for a Voyage
is to commit to participating as a team and to see it through to the end.

### Symptoms

- A team member signs up for a Voyage, but never shows up.
- A team member participates in initial team meetings, but then stops
participating and doesn't respond in Slack.
- A team member communicates infrequently and as a result is "out of sync"
with the rest of the team.

### Preventative, Corrective, or Mitigating Actions

1. At your first team meeting:
   - Make sure your team understands the importance
of teamwork, supporting each other, and the commitment they've made to
completing the Voyage.
   - Collect everyone's Slack id, email address, and any other communication
   channel that will help you maintain contact as the Voyage progresses.
2. Identify members of the team who may need technical assistance and
schedule pair programming sessions to mentor and support them. Team members
sometimes leave Voyages because they are overwhelmed and this is one step
you can take to prevent this situation.
3. Life Happens! Events sometimes occur in peoples lives that will prevent
them from honoring a commitment. Make sure the team understands that if this
should occur what matters isn't that they leave, but _how_ they leave.
Communicating the need to exit to the PM should be a requirement, _not_ an
option.
4. If a team member stops responding, allow a reasonable time frame for
continuing to reach out to them (no more than one week). If they still
haven't responded, divide their work among the rest of the team, adjust your
project schedule accordingly, and move on.
5. Use the weekly team checkins to report team members who have stopped
participating. Depending on the size of your team, the complexity of
the project, and where you are at within the Voyage, you might also want
to ask for the addition of new team members to fill the gap.

    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Resources", title: 'Tools & Resources',
    content: `## Tools

Below are some tools and resources teams have found helpful in the past. Most of these were discovered by people like you, so if you find a resource or tool that was helpful please let us know! 🚀

### Chingu-X & The Wizard

Chingu is a platform to launch opportunities for developers, but another part of Chingu is researching and developing ways to better facilitate those opportunities. We call this global collaboration lab Chingu-X, and they built:

* **The Wizard Acts & Milestones** - This is a tool to provide structure and a project roadmap for teams to follow. Project Managers will log the team's progress here which will also help us determine what teams need support.

* **The Wizard Standups** - This is a tool to better facilitate team communication. It will ping you twice a week to answer a few short questions (ex. What did you work on? What are you going to work on? What is blocking your way?) and relay that information back to your team.


### Project Management Organization tools

A major part of project management is organizing the information you collect
from your team and organizing it in a way that is actionable. Tools such as the
following help you create a backlog of tasks that can be tracked as they
progress through various states such as Next, Blocked, In Progress, Review, and
Completed.

Regardless of which tool you might choose, a prime requirement is that the tool
must support sharing assignments and progress with the team.

- [GitHub Projects](https://help.github.com/articles/about-project-boards/)
- [Trello](https://www.trello.com)
- [Waffle](https://www.waffle.io)
- [ZenHub](https://www.zenhub.com/)
- [Google docs](https://docs.google.com/) (better used as an ideation tool or the intial breaking down of a project to clone)
- [Asana](https://www.asana.com)

Here are some past examples of Voyage members using these tools:

- [Github Projects example (Toucans)](https://github.com/chingu-voyage3/toucans-06/projects/1)
- [Trello example](https://trello.com/b/91AF3Eh9/chingu-project-example)
- [Waffle example](https://waffle.io/chingu-voyage3/ideanebulae)
- [Ideation in Google Docs](https://docs.google.com/document/d/1rrNIb8j0Ixcv5xE0wIMOxoIbTQABwC9SwqqJVe5ruDM/edit?usp=sharing)


### Meeting Tools/Pair Programming

Conducting meetings and pair programming activities both require that you
schedule sessions at a date and time that is convenient to all
participants. They also require that you and your team select a tool
with features to help you to efficiently communicate. These features include
audio, video, text messaging, and screen sharing.

Teams may need to be flexible and adapt as need-be to make meetings and pair-programming adventures possible.

Here's an article for [Virtual Icebreakers for Remote Teams](https://www.collaborationsuperpowers.com/44-icebreakers-for-virtual-teams/)

#### Scheduling Meetings and Coordination Tools

Scheduling meetings in an organization like the Chingus is complicated by the
fact our team mates are spread across many continents and timezones. Coupled
with team mate obligations outside of the Chingu universe, this makes finding
meeting times suitable for all team members as difficult as trying to nail
Jell-O to a tree.

- [Meekan](https://meekan.com/) - This is the primary tool we encourage PMs to use for scheduling meeting times. Meekan will be installed in the Voyage slack but each member has to activate it with their calendars. PMs may have to Direct-Message members of their team who don't have it activated.
- [World Clock Meeting Planner](https://www.timeanddate.com/worldclock/meeting.html)
- [Timezone](http://timezone.me/en/meeting-planner)

#### Meeting & Pair Programming Tools

- [Appear.in](https://appear.in/) - some teams swear by this tool for its flexibility and ease of use for doing meetings.
- [Discord](https://discord.com)
- [Google hangouts](https://hangouts.google.com/) - great for audio/video meetings and has screenshare functionality. Everyone needs to have a gmail account though.
- [Jitsi](https://meet.jit.si)
- [Slack](https://slack.com)
- [Talky.io](https://talky.io)
- [Team Viewer](https://www.teamviewer.us/)

### Issue Tracking

Keeping track of the issues to ensure that they are quickly and permanently
resolved plays a major role in improving product quality and lowering technical
debt. The rigor your team shows in how they deal with issue reporting reflects
their maturity as both a team and in their chosen profession as WebDevs.

Some tools that can be used to introduce the necessary rigor to issue tracking
include:

- [GitHub Issues](https://guides.github.com/features/issues/)
- [Waffle.io](https://www.waffle.io) Integrates into Github Issues
- [Airtable.com Bug Tracker Template](https://airtable.com)
- Any kanban system (ex. Trello) which you track bugs, categorize them and work through them.

### Reference Material

In your role as a PM you may find the following useful.

#### Project Management Methodologies

- [The Agile Manifesto](http://agilemanifesto.org/)
- [A Short Introduction to the Scrum Methodology](https://medium.com/chingu/a-short-introduction-to-the-scrum-methodology-7a23431b9f17)
- [6 Tips of Building Efficient Team in Chingu](https://medium.com/chingu/6-tips-of-building-efficient-team-in-chingu-3477c2f7305b)
- [Project Scope — what it is and why it’s important](https://medium.com/chingu/project-scope-what-it-is-and-why-its-important-1a07c8e07dbf)

#### Chingu Resources

- [If You Ever Get One of these 5 Chingus On Your Team You Just Hit the Remote Dev Jackpot](https://medium.com/chingu/if-you-ever-get-one-these-5-chingus-on-your-team-you-just-hit-the-remote-dev-jackpot-79a1e22de12a)
- [@redrocket on his experience as PM and his team's workflow in Voyage-2](https://youtu.be/6TsFBW-c6to)
- [Taking the reins: A Junior Developer’s voyage as a PM](https://medium.com/chingu/taking-the-reins-a-junior-developers-voyage-as-a-pm-c2883ae04467)


#### Voyages

- [Build-2-Learn Roadmap](https://medium.com/chingu/voyage-build-2-learn-roadmap-ba4e25dda59e)
- [The Voyage 3 Remote Developer Project Process](https://medium.com/chingu/the-voyage-3-remote-developer-project-process-2eda5aea2d51)
- [The Voyage 3 Handbook](https://medium.com/chingu/the-voyage-3-handbook-1487c688a17a)
- [So I'm Supposed to be a PM for my Remote Dev Team](https://medium.com/@tropicalchancer/so-im-supposed-to-be-a-project-manager-for-my-remote-dev-team-what-the-do-i-do-4fb8a244b85f)

#### Project Management Organizations

- [Project Management Institute](https://www.pmi.org/)
- [Scrum Alliance](https://scrumalliance.org)


## Wise words from past Chingu Project Managers

**What kind of resource do you think would be most helpful for PMs?**

From [Vannya](https://github.com/vannya):

### 1
 I would say first, anything that can help PMs define scope. I'm not just talking about user stories like FCC and others use.  But just good info on scope definition to get to an MVP.
They can be written in any form.  You'll see on my board, we wrote a list of the features, split them into musts and maybes, and defined our scope as the musts.  No maybes could be touched without the others complete. SMART is the acronym for scope.....specific, measurable, achievable, realistic and time frame (meaning what can be accomplished in the amount of time we have).

I think this has tripped up failing teams the most.  They spend either way too much time on scope and lose enthusiasm or don't do it and just code all wild.

Let me see if I can find anything specific to help.
 - [10 Classic Mistakes That Plague Software Development Projects](https://www.techrepublic.com/blog/10-things/10-classic-mistakes-that-plague-software-development-projects/)
 - [The PM’s Role in Software Development](https://www.seguetech.com/the-project-managers-role-in-software-development/)
 - [Manage Remote Developers](https://www.upwork.com/hiring/for-clients/manage-remote-developers/)

### 2
Second, Basic git functions.  The PM HAS to learn git.

-Kornil's articles for sure
- [Part 1](https://medium.com/@francesco.agnoletto/how-to-not-f-up-your-local-files-with-git-part-1-e0756c88fd3c)
- [Part 2](https://medium.com/@francesco.agnoletto/how-to-not-f-up-your-local-files-with-git-part-2-fc4e243be02a)
- [Part 3](https://medium.com/chingu/how-to-not-f-up-your-local-files-with-git-part-3-bf03b27b6e64)

[How to use Git Effectively](https://www.digitalocean.com/community/tutorials/how-to-use-git-effectively)
[Git docs](https://git-scm.com/documentation)

Seriously, the docs are what I use the most for git when I forget how to use it.

### 3
Third, maybe resources to help them first get off the ground.  A good start could really get these teams to the finish line stronger.
- [Project Kickoff Checklist Infographic](https://www.wrike.com/blog/project-kickoff-checklist-infographic/)
I'm trying to find something that isn't business focused for project kickoff meetings.
- [5 Scrum Master Advice](https://hackernoon.com/5-scrum-masters-on-their-best-advice-for-leading-high-performing-teams-5b6db1165ab)

## Bonus
Here's another good [short read about not overly planning the project out.](https://hackernoon.com/start-together-finish-together-5b47ca1209b3)  Just getting a good framework and moving through it.
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Resources>PM FAQ", title: 'I\'m Nervous!',
    content: `## Nervous

### Ok, I'm the PM, but I'm nervous!

You may be thinking "Ok, I'm the PM, what the ?!?$ do I do now???"

It's completely natural to feel nervous, especially if it's your first time being a Project Manager. Don't worry, we're a community of people who regularly get out of our comfort zones to improve. You're not alone (each Voyage there's anywhere from 40-100 fellow PMs with you, many of them first-time PMs).

Here are a few reflections from past Chingu Project Managers (who once felt the same as you):

- [Ben's video: on his PM experience](https://www.youtube.com/watch?v=6TsFBW-c6to&feature=youtu.be)
- [Olly's article: Taking the reins: A Junior Developer’s voyage as a PM](https://medium.com/chingu/taking-the-reins-a-junior-developers-voyage-as-a-pm-c2883ae04467)
- [Vannya's video: on starting off with enthusiasm](https://vimeo.com/244577373)

### This is the first time I've been a PM. Am I ready?
This is a question only you can answer.  However, if you've read through this wiki and are willing to put in the time and effort, you can be.  Just remember to reach out with any questions immediately and to just keep moving your team forward.  The Chingu community is learning and growing together.  We are all here to support one another.

### What do I do if I need help?
Everyone needs help sometimes. Be prepared to ask for it when you need it.  First, look back over this wiki and see if the answer is here. We will be adding to it often as questions arise.  Additionally, you can head to the PM slack and ask the other PMs.  Possibly one of us will have stumbled across that same issue and have the answer.
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Resources>PM FAQ", title: 'Your Team',
    content: `TBD
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Resources>PM FAQ", title: 'Git & Github',
    content: `TBD
    `},
  { creator: sys_id, topic: "PMRoK", sub_topic: "Resources", title: 'Glossary',
    content: `**_backlog_** - The main source of information about the project is the _Product Backlog_, which defines requirements the application must meet in order to be successful. Requirements are expressed as user stories of the format: “As a: <role> I want to: <function-description> So I can: <value-statement>”

**_blocker_** - Any issue or task that is preventing the project from moving forward or is preventing another task from being able to be started.

**_burndown chart_** - A graphical view of the number of stories in the backlog that have been completed against the total number remaining across sprints.

**_sprint_** - Application development cycles lasting from one to four weeks. Sprint length is fixed across the life of the project and is chosen by the team. A fixed number of user stories are assigned to each sprint. This is not to say that stories cannot be added to the sprint. Just that they can’t be added if doing so exceeds the capacity of the team to create, test, and deploy a working application by the end of the sprint.

**_story points_** - A measure of relative effort or difficulty required to complete a given story. Part of the backlog grooming process is for the Scrum Team to review user stories and estimate the number of story points required for each one. There are many different methods that can be used for this and the one chosen by the Scrum Team isn’t as important as the need to be consistent when estimating story points.

**_velocity_** - Measures the average rate that stories are completed across sprints. The basic method is to divide the number of story points completed by the total number in the product backlog. Over time velocity is a measure of the work that can be expected to be completed in a sprint and it is used to ensure that the team doesn’t overcommit the number of story points to be completed in a given sprint.
    `}
]);
