/* eslint-disable */
const Article = require('../backend/models/article');
const { Topic, SubTopic } = require('../backend/models/topic');

const seedVoyage = async sys_id => {
  const topic = new Topic({ name: "HELP", order: 3 });
  try {
    await topic.save();
  } catch (e) {
    console.error('help topic save failed:', e);
    process.exit(1);
  }
  const about = new SubTopic({ parent: topic._id, name: "About this CMS", order: 10 });
  const howto = new SubTopic({ parent: topic._id, name: "How to ...", order: 11 });
  try {
    await about.save();
    await howto.save();
  } catch (e) {
    console.error('help save failed:', e);
    process.exit(1);
  }

  await Article.create([
    // { creator: "1", topic: "", sub_topic: "", content: "" },
    { creator: sys_id, topic: topic._id, order: 1, title: 'Introduction',
      order: 1,
      content: `# Introduction
The CMS is made up of articles. Each article has a title, order, topic and optional sub topic.

The title will appear in the CMS sidebar as the link to the article

The order is a number that places the article in the CMS sidebar list, within its
sub topic or topic. e.g. An article with order 1 will come before an article with order 2.

The topic is used to group articles together, like in books.

The sub topic is used to group articles within the same topic, like chapters in a book.
The sub topic is optional, so articles can appear above the sub topics in the CMS sidebar.`
    },
    { creator: sys_id, topic: topic._id, sub_topic: about._id, title: 'About this CMS',
      order: 1,
      content: `# CMS Change Workflow

The CMS change workflow will depend on a members trust level.

## Trust Levels

Trust levels prevent content of the CMS being trashed by unknown users. There are
two trust levels currently, characterised by the roles member and admin.

### Member

Members request updates by making the update in the usual way, by editing an article,
but the changes will not be applied until verified/moderated by a user with admin trust level.

Members can update articles and assets, but cannot see the UserList page or edit user
profiles, except for their own profile.

### Contributor

Contributors can update articles and assets and the changes are reflected immediately in the content.

Contributors cannot see the UserList page or edit user profile, except for their own profile.

### Admin

Admin user can change anything and the change will be immediately reflected.
      ` },
      { creator: sys_id, topic: topic._id, sub_topic: howto._id, title: 'Create a New Article',
        order: 1,
        content: `# Create a New Article

1. Login if you are not already.
2. Navigate to the articles page.
3. Click the New Article button. This should navigate to the Create new article page.
4. Enter a title, order and select a topic and sub-topic from the dropdown lists.
5. Enter some content for the article.
6. You can see what the article content will look like by selecting the PREVIEW tab.
7. When you are happy with the article, click the save button.
        `},
        { creator: sys_id, topic: topic._id, sub_topic: howto._id, title: 'Edit an Article',
          order: 2,
          content: `# Editing an Article
Navigate to the article list and selecting the article you want to edit.
If you find a boo-boo whilst viewing an article in the CMS page, you can navigate
to the edit page by replacing cms with articles in the browser address bar. You must be
logged in of course.
          `}
  ]);
};

module.exports = seedVoyage;
