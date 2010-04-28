require 'yaml'
require 'transform-results'

include TransformResults

results = YAML.load_file( 'example-hash.yml' )
transform(results, $stdout)