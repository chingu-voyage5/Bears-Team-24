
# backlog draft

* Create a cms
* Content will be entered using markdown.
* Each article will display contributors (nice to have)

## terms

* visitor - unauthed user
* member  - authed user can update content
* admin   - god
* article - a page of content
* page    - a specific screen view of the app

## User Stories

Most of the user stories are split in github issues to address carving up tasks and frontend/backend development separately.

As a dev:

* I want to scaffold app so we can all work off same structure from the start
* I want linting set up so I don't have to worry about formatting

As a visitor:

* I can navigate the content so that I can find what I'm looking for
  * test sidebar topics can be expanded/collapsed
  * test sidebar nav allows all docs to be selected
  * test doc selection displays correct content
* I can search all the dox so that I can find things quickly
  * I can search by topics
  * I can search by body text
* I can register
  * test user role is member

As a member

* I can do everything a visitor can
* I can login
* I can reset my password
* I can view the profile of users that contribute to any article
* I can edit my own profile
* I can select navbar items to view pages and assets
  * I can see a list of pages by topic
  * I can see a list of assets by type
* I can amend content
  * I can click on a page and see an editable version of the page so I can amend content
  * I can add assets to a page using markdown notation
  * I can click on an asset and see an editable version so I can amend the asset detail
* I can create content
  * I can create new pages
  * I can enter content into a page using markdown notation
  * I can create assets
  * I can manipulate the images I create

As an admin

* I can amend a user's role
