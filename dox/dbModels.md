
## Users

name    |type
----    |----
_id     |mongo_id
name    |string
email   |string
role    |string
avatar  |asset._id
bio     |string

## Pages

name              |type
----              |----
_id               |mongo_id
created           |date
last_updated      |date
creator           |user._id
contributor_list  |[user._id]
category          |string
sub_category      |[string]
content           |String


## Assets

name            |type
----            |----
_id             |mongo_id
type            |string
created         |date
last_updated    |date
creator         |user._id
content         |base64 string
