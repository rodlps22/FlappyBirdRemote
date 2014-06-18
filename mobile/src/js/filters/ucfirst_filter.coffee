kzAppUpperCaseFirstFilter = angular.module "kzApp.filters.ucfirst", []

kzAppUpperCaseFirstFilter.filter('ucfirst', () ->
  (value) ->
    result = []
    tmp = []  
    if value.indexOf(" ") >= 0
      tmp = value.split(" ")
    else
      tmp.push value

    for i of tmp
      result.push (tmp[i].charAt(0).toUpperCase() + tmp[i].slice(1))
      continue
      
    result.join " "
)