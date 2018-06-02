# Overview

## CMS

This CMS is organised around the idea of articles grouped together in books and chapters. Navigation is performed using a tree which can be expanded to reveal the different sub-topics and articles contained therein.

Registered users will be able to update the CMS content using an extended menu.

### Content Updates

We need to control changes to content to prevent malicious damage. To implement this we will create a change request mechanism and a new user role, moderator.

Changes made on the front end will be sent to the backend as they are currently. The backend will check the user role and will update the article as is currently done for moderators. For members, a change request will be created in a new table, say "requests".

Moderators will be able to fetch a list of pending requests. Selecting an item in the list will navigate to a detail page, showing the change diff and accept and reject buttons. Clicking the accept and reject buttons will post to the backend which will perform the following actions:

* Accept will cause the article to be updated, the request table status updated to accepted and an entry in the history table.
* Reject will cause the request table status updated to rejected.

Let's not delete the requests for now, this will give us an insight into members accept/reject ratio and perhaps trigger trust level increase to moderator or in extreme cases, the boot!

*It would be nice to have a preview frame showing the requested updates, similar to what we have in the article edit/view page.*


## Articles

Articles are created with existing topics and sub-topics, which have to be created first and are presented in droplists. Articles have an order attribute to specify the order they appear in the CMS tree. Alphabetical ordering didn't work! As articles are created and updated they build up a history of contributors.

## Topics

Topics are analogous to books and represent the top level naviation. Topics have an order attribute specifying where they appear at the top level of the cms tree.

## Sub-topics

Sub-topic are analogous to chapters. Sub-topics have a path, so different articles can be grouped together in sections, within a chapter. Sub-topics have an order attribute which specifies where the sub-topic appears in the cms-tree.


# Pages

## Landing Page

 Currently everyone start the site on the landing page, though there are plans afoot to remove this. It is felt it would be better to land straight to the Articles view page with the CMS tree in a sidebar for navigation. On mobile this will be in a hideable drawer view.

## Access Pages

  * register page (visitor)
  * login page (member)


## Content View

  * CMS - visitor view. Sidebar with content tree for navigating articles

## Dashboard View

  Facilitates content creation and comprises the following pages:

  * Topics (and subtopic)
  * Articles
  * Assets
  * Users
  * Change Requests

### Topics

This page allows creation and ordering of the topics and associated sub-topics.

Topics and sub-topics will be created separately rather than on an ad-hoc basis as articles are created. This prevents oopsies like mis-spelling.

### Articles

This page facilitates the creation and update of articles. There are two droplists for selecting topic and sub-topics and an order field to set the position of the article within the cms navigation tree.

### Assets

  * images/audio/video
  * list view
  * crud ops

### Users

There will be four levels of users. Visitor, member, moderator and admin.

Visitor is a non-role in that it is just a placeholder for site visitor who are not registered.

Member is a registered role. The role will be able to update articles but the changes will have to go through moderation and so are not applied immediately.

The Moderator role is a registered role that allows a user to update articles directly, and accept or reject changes requested by users with the member role.

The admin role is a moderator with access to user profiles other than their own. This facilitates role setting for other registered users.

#### User Views

  * login/out/register/reset
  * profile
  * Roles
    * visitor(no auth)
    * member
    * moderator
    * admin
  * list view
  * crud ops

### Change Requests

This page facilitates the updates to articles by the member role. When a member edits an article a change request is created rather than updating the article directly. Moderators can then view the requested changes using this page to either accept or reject the changes.

  * list of requested changes
  * view a specific change request allowing accept/reject ops

# wireframes

screen wireframes available at wireframe.cc (wireframes have code in filename)

wireframes in dox have codes for site `wireframe.cc/<code>`
