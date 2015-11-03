##Thermostat

This project is from the week 5 weekly challenge of the Makers Academy course.
This challenge introduces javascript and its testing framework to us. After
building the thermostat logic, we then try to link it up to the html page for
interactive use, firstly using vanilla javascript, then using jQuery. Then, we
try to make the data persist but using a server and saving it in a session.

##Challenges

Javascript was new to me but it didn't take all that long to get used to. Also,
the Jasmine testing framework was very similar to RSpec so that was a plus. I
did initially find it difficult to link the html elements with the javascript
objects. It made a lot more sense after redoing it again but with jQuery.
Mocking the API call was probably the hardest thing to do in this challenge.
However, from this process, I learnt a lot about spy objects and what they can
do. Funnily enough, I found three ways to mock the API call in the end.

##Technologies used

Javascript, jQuery, HTML, CSS, Sinatra

Jasmine, Jasmine jQuery

##How to install

Clone the repo, open index2.html to run the app. If you want persistence based
on server running, rackup and then visit localhost:9292.

To run the tests, run open specrunner.html in the terminal. Tests might fail if
the default browser is Chrome. Please switch to Safari if that is the case.
