# Back-end vs Front-end Deveopment

Client - Server Relationship

## Dissecting the Event Loop

Event Loop handles all application code that is inside **callback functions** (non-top level code). Event-driven architecture:

    - Events are emitted

    - Event loops picks emitted event

    - Callback functions are called once required are available

    - Event Loop does _orchestration_

Processing outline - What order the Event Loop handles events

1. Expired timer callbacks

2. I/O (Input/Output) polling and callbacks - Networking & file access

3. setImmediate callbacks - important in advanced use cases

4. Close callbacks - shutdown event callbacks

**Override** with using process.nexttick() queue to ensure that callback runs immediately after whichever stage Event loop is in

Limit Thread Blocking:

- Do not use _sync_ versions of functions in `fs`, `crypto`, `zlib` modules in your callback functions

- Do not perform complex calculations (e.g. loops) inside loops

- Be careful with `JSON` in large objects

- Do not use too complex regular expressions (e.g. nested quantifiers )
