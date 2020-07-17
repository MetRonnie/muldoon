# isodatetime changes

Go to https://github.com/metomi/isodatetime/milestones?state=closed
for a full listing of issues for each release.

<!-- The topmost release date is automatically updated by GitHub Actions. When
creating a new release entry be sure to copy & paste the span tag with the
`actions:bind` attribute, which is used by a regex to find the text to be
updated. Only the first match gets replaced, so it's fine to leave the old
ones in. -->

--------------------------------------------------------------------------------

## isodatetime 2.1.0 (<span actions:bind='release-date'>Upcoming, 2020</span>)

This is the 15th release of isodatetime. Requires Python 3.5+.

### Noteworthy Changes

[#165](https://github.com/metomi/isodatetime/pull/165):
Data classes are now immutable and hashable.

--------------------------------------------------------------------------------

## isodatetime 2.0.2 (Released 2020-07-01)

This is the 14th release of isodatetime. Requires Python 3.5+.

### Noteworthy Changes

[#148](https://github.com/metomi/isodatetime/pull/148):
Exceptions have moved to `metomi.isodatetime.exceptions`.

[#151](https://github.com/metomi/isodatetime/pull/151):
CLI can now read in from piped stdin.

[#157](https://github.com/metomi/isodatetime/pull/157):
TimePoints can no longer be created with out-of-bounds values, e.g.
`2020-00-00`, `2020-13-32T25:60`, `--02-30` are not valid.

--------------------------------------------------------------------------------

## isodatetime 2.0.1 (Released 2019-07-23)

This is the 13th release of isodatetime.

This release requires Python 3.5 or above.

Note the major change in namespace from `isodatetime` to `metomi.isodatetime`.

### Noteworthy Changes

[#122](https://github.com/metomi/isodatetime/pull/122):
CLI take mixed required and optional arguments (Python 3.7+ only).

[#127](https://github.com/metomi/isodatetime/pull/127):
Raise a useful `ValueError` if time point is invalid.

[#130](https://github.com/metomi/isodatetime/pull/130):
Support the CF compatible calendar mode strings `360_day`, `365_day` & `366_day`

[#132](https://github.com/metomi/isodatetime/pull/132):
Change namespace of `isodatetime` to `metomi.isodatetime`
