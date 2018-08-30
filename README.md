Living Code
===========

What if we could build code and never worry about negatively impacting our users while also saving on server cost because production is the only environment that really matters.

## Purpose

Pushing code to production can be a pain even with continuous integration and delivery. This concept is meant to automatically handle live code updates, build and runs tests, and determines if code is ready for "prime-time" through testing and piloting.

## Tenents
- Environment-less: All application code lives in the production environment where only working code is widely available.
- Testing: Using real data to build models of how functions and classes interact to automate testing entirely.
- Piloting: Allowing certain features to be automatically piloted to end users without any need.
- Database: An ORM that tracks code changes and responds accordingly or converts where necessary.
