# Mirage + Caos

Chaos Engineering - Chaos engineering is the discipline of experimenting on a software system in production in order to build confidence in the system's capability to withstand turbulent and unexpected conditions.

[Brian Holt's talk about it](https://www.youtube.com/watch?v=A4_rRj-4Mv0) is great, Chaos Imp is not finished (and I didn't manage to find a version of it online).

The main purpose of `caos` is to **build more reliable UIs**. It does it by adding some _caos to the networking layer_ by adding random delays and having endpoints failing with multiple error codes.

It works on apps using `miragejs` (as it wraps the mirage server). Being more specific it actually just acts on the `pretender` instance for now, but connecting it with mirage might be useful in the future to enlarge the error variety.

## Note

This is still a proof of concept, stuff like errors, API is super unstable and still to be decided. Tests are also missing.
However, if you find it useful, more than happy to accept all types of contributions.

## Usage

```js
import { Server } from "miragejs";
import { addCaos } from "miragejs-caos"; // package name not registered

const ServerWithCaos = addCaos(Server, { level: "high" });

new ServerWithCaos({
  // mirage config
});

// Your Mirage will now randomly fail
```

## API

# addCaos(Server: MirageServer, options: any): MirageServerWithCaos

## options.level

At the moment there are multiple _failure rates_ that you can send to `addCaos` as a `level`.

- High - fails 80% of the time (error is random) - `high`
- Medium - fails 40% of the time (error is random) - `medium`
- Low - fails 10% of the time (error is random) - `low`

## options.shouldFail(callback: Function): Boolean

`shouldFail` is called on every request with the `request` object, it is used to decide if that specific request should proceed of fail.

## options.getBreakingCase(callback: Function): String

`getBreakingCase` is called on every request with `Pretender` `request` object.
The code of the error should be returned. Error codes are exported as `caosCases`.

```js
import { caosCases } from "miragejs-caos";
```

There are multiple error cases available at the moment:

- bigDelay - Waits for a random delay until it answers the request
- random5XX - Responds with a random 5XX error
- serviceUnavailable - Responds with a 503
- gatewayTimeout - Responds with a 504
- unauthorized - Responds with a 403

# Known bugs / Future improvements

- At the moment all the mirage logs are supressed (as the pretender instance is being created by `caos`)
- API is still messy and not very coherent
- Tests are missing

# Raw ideas

- Integrate with Mirage Factories/db in order to mess with the payload
- Make HTTP requests `abort` before they reach the server (offline behaviour)
