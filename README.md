# RxJS

Project under construction

## Current experiments

### Custom pending changes confirmation dialog modal

It warns you about when you try to leave from a form with pending changes. Its implementation mainly requires these steps:

+ create a dialog component. This should be included in the component which has the target form.
+ create an interface with a method to know if there are pending changes. The top level component which contains the target form should implement this interface. The one that appears on routing module which uses the guard.
+ create a Guard. Its `canDeactivate` guard method should check whether or not are pending changes. If so, should retrieve the answer of the dialog modal:

  Algorithm: `canDeativate = Changes ? Dialog : true`

  | Changes | Dialog   | canDeativate | Meaning       |
  |:-------:|:--------:|:------------:|:-------------:|
  | `true`  | `true`   | **`true`**   | Leave         |
  | `true`  | `false`  | **`false`**  | **NOT leave** |
  | `false` | no modal | **`true`**   | Leave         |

+ add the guard to the path on routing module which makes use of this feature.
+ register as a provider the guard and the service on `app.module.ts`
+ create a service which allow Guard and top level form component container communicate each other.