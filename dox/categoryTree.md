# Category Tree

Items with '+' are category and sub_categories. The rest are article titles.

```
+ Voyage
  + About this wiki
    Home
    How To Contribute
  + About Voyages
    About Voyages
    Voyage Roadmap
    .. Tier1 Schedule
    .. Tier2 Schedule
    Voyage Support
    What Team Am I On?
  + Project Setup
    Understanding Your Obligations
    Establishing the Team
    Setting up your Git workflow
    Defining your project
  + Development Sprints
    Creating a Readme
    Pair Programming
    Tracking Issues
  + Project Closure
    TBD
  + Tools and Resources
    Useful Links
    + FAQ
      Voyage wiki
      Voyage
      Your Team
      Git & GitHub
      Slack
      Project Licence
    Glossary
+ pmrok
  + About this wiki
    The Chingu PMRoK
    How to Contribute
  + About Voyages
    Voyage Roadmap
    Voyage Workflow
  + Managing a Project
    Project Manager Concepts
    Your Sprints
    Conducting an MVP
    Project Closure
    Using the Wizard
  + Guidance
    Situational Guidance
    Managing Conflict
  + Resources
    Tools & Resources
    + PM FAQ
      I'm Nervous!
      Your Team
      Git & GitHub
    Glossary
```

## Sub Categories

Sub categories need to be flexible as we have no way of knowing (for new content) how deep articles will be nested.

The [article edit/view page](https://github.com/chingu-voyage4/Bears-Team-25/blob/develop/frontend/src/ArticleEdit/ArticleEdit.js) has title, category and sub-category fields. The title and category are self explanatory.

The sub category will be entered using forward slash delimiters.
e.g.
Tools and Resources/FAQ
