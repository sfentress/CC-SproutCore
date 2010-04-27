require 'capybara'
require 'capybara/dsl'
require 'yaml'
require 'rexml/document'
include REXML

Capybara.current_driver = :selenium
Capybara.app_host = "http://localhost:#{ENV['SC_SERVER_PORT']}"

include Capybara

visit('/cc/en/current/tests/views.html')
# t = find('//table')

# {"failed"=>0, "warnings"=>0, "tests"=>4, "finish"=>1272374164684, 
#  "errors"=>0, "total"=>4, "runtime"=>7, "start"=>1272374164677, "passed"=>4, 
#   "assertions"=>[
#     {"result"=>"passed", "message"=>"test should equal test: test", 
#         "module"=>"views/applet.js\nCc.AppletView", "test"=>"test description"}, 
#     {"result"=>"passed", "message"=>"test should equal test: test", 
#         "module"=>"views/multiple_choice_question.js\nCc.MultipleChoiceQuestionView", "test"=>"test description"}, 
#     {"result"=>"passed", "message"=>"test should equal test: test", 
#         "module"=>"views/mw_applet.js\nCc.MwAppletView", "test"=>"test description"}, 
#     {"result"=>"passed", "message"=>"test should equal test: test", 
#         "module"=>"views/question.js\nCc.QuestionView", "test"=>"test description"}]}

results = evaluate_script('CoreTest.plan.results')
#puts results.to_yaml
#results = YAML.load_file( 'example-hash.yml' )
#puts results.inspect

class TestModule
  attr_accessor :name, :tests, :failures, :errors
  
  def initialize(name)
    @name = name
    @tests = []
    @failures = 0
    @errors = 0
  end
end

class TestTest
  attr_accessor :name, :assertions, :failed
  
  def initialize(name)
    @name = name
    @assertions = []
    @failed = false
  end
  
  def failed_message
    puts self.assertions.inspect
    failures = self.assertions.select{|assertion| assertion['result'] != 'passed'}
    puts "num failures: #{failures.length}"
    messages = failures.collect{|assertion| assertion['message']}
    messages.join('\n')
  end
end

# collect the results by the module tag
# collect the results in the module by the test tag
def parseResults(results)
  modules = []
  currentModule = nil
  currentTest = nil

  results['assertions'].each{|assertion| 
    if currentModule.nil? or currentModule.name != assertion['module']
      currentModule = TestModule.new(assertion['module'])    
      modules.push(currentModule)
    end
  
    if currentTest.nil? or currentTest.name != assertion['test']
      currentTest = TestTest.new(assertion['test'])
      currentModule.tests.push(currentTest)
    end
  
    currentModule.failures += 1 if assertion['result'] == ('failed')
    currentModule.errors += 1 if assertion['result'] == ('errors')
    if assertion['result'] != 'passed'
      currentTest.failed = true
    end
    currentTest.assertions.push(assertion)  
  } 
  
  modules
end
# puts modules.inspect

modules = parseResults(results)
 
doc = Document.new();
testsuites = doc.add_element('testsuites')
  # testsuite = testsuites.add_element('testsuite', {
  #    'tests' => results['tests'],
  #    'errors' => results['errors'], 
  #    'failures' => results['failed'],
  #    'timestamp' => results['finish'],
  #    'time' => (results['runtime']),
  #    })

modules.each{ |currModule|
  testsuite = testsuites.add_element('testsuite', 
    {'name' => currModule.name.split(' ')[1], 'tests' => currModule.tests.length,
      'failures' => currModule.failures, 'errors' => currModule.errors})
  currModule.tests.each{ |currTest|
    testcase = testsuite.add_element('testcase',
    {'name' => currTest.name, 'classname' => currModule.name.split(' ')[0]})
    if currTest.failed      
      testcase.add_element('failure', {'message' => currTest.failed_message})
    end
  }  
}

File.open('results-junit.xml', 'w'){|file|
  pretty_formatter = Formatters::Pretty.new(2)
  pretty_formatter.compact = true
  pretty_formatter.write(doc, file)
}
