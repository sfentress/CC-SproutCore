require 'capybara'
require 'capybara/dsl'
require 'transform-results'

Capybara.current_driver = :selenium
Capybara.app_host = "http://localhost:#{ENV['SC_SERVER_PORT']}"

include Capybara

visit('/cc/en/current/tests/views.html')
results = evaluate_script('CoreTest.plan.results')

#uncomment this to save results for quicker testing of the transform
#puts results.to_yaml

include TransformResults

File.open('results-junit.xml', 'w'){|file|
  transform(results, file)
}

