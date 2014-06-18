kzAppPassconfirmDirective = angular.module "kzApp.directives.passconfirm", []
kzAppPassconfirmDirective.directive "pwCheck", [ ->
  require: "ngModel"
  link: (scope, elem, attrs, ctrl) ->
    firstPassword = "#" + attrs.pwCheck
    elem.add(firstPassword).on "keyup", ->
      scope.$apply ->
        valid = elem.val() is $(firstPassword).val()
        ctrl.$setValidity "pwmatch", valid
        return

      return

    return
]