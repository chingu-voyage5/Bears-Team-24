
## Users

name    |type       |enum
----    |----       |----
_id     |mongo_id   |
name    |string     |
email   |string     |
role    |string     | visitor,member,admin
avatar  |asset._id  |
bio     |string     |

## Articles

name              |type
----              |----
_id               |mongo_id
created           |date
last_updated      |date
creator           |user._id
contributor_list  |[user._id]
topic             |string
sub_topic         |[string]
title             |string
content           |String


## Assets

name            |type           |enum
----            |----           |---
_id             |mongo_id       |
type            |string         |image,audio,video
created         |date           |
last_updated    |date           |
creator         |user._id       |
content         |base64 string  |
