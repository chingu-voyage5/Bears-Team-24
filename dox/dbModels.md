
## Users

name    |type       |enum
----    |----       |----
_id     |mongo_id   |
name    |string     |
email   |string     |
role    |string     | visitor,member,moderator,admin
avatar  |asset._id  |
bio     |string     |

## Articles

name              |type
----              |----
_id               |mongo_id
created           |date
last_updated      |date
creator           |user._id
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


## Topics

name            |type           |enum
----            |----           |---
_id             |mongo_id       |
name            |String         |
order           |Number         |

## SubTopics

name            |type           |enum
----            |----           |---
_id             |mongo_id       |
parent          |topic._id      |
name            |String         |
order           |Number         |

## Histories

name            |type           |enum
----            |----           |---
_id             |mongo_id       |
contributor     |User._id       |
created         |Date           |
topic           |Topic._id      |
sub_topic       |SubTopic._id   |
article         |Articles._id   |
asset           |Assets._id     |
sizePre         |Number         |
sizePost        |Number         |
