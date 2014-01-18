function ColoradoFourteeners() {
	var quizName = "Colorado Fourteeners";
	var currentQuestion = "";

	var q1={
		question:"How many peaks in Colorado are 14,000 feet high or higher?",
		answers:["10","17","53","54"],
		correctAnswer:3,
		userAnswer:0};
	var q2={
		question:"What is a ranked 14er mountain?",
		answers:["Any mountain over 14,000 feet high",
		         "A mountain peak that is at least 300 feet higher than any connecting ridge or saddle, and over 14,000 feet high"],
		correctAnswer:2,
		userAnswer:0};
	var q3={
		question:"What is the highest 14er in colorado?",
		answers:["Longs Peak", "Mt. Elbert", "Blanca Peak"],
		correctAnswer:2,
		userAnswer:0};
	var q4={
		question:"What is the shortest 14er in colorado?",
		answers:["Sunshine Peak","Huron Peak","Mt. of the Holy Cross"],
		correctAnswer:1,
		userAnswer:0};	
	var q5={
		question:"Which state has the largest group of mountains over 14,000 feet?",
		answers:["Alaska","California","Colorado"],
		correctAnswer:3,
		userAnswer:0};
	var q6={
		question:"Which 14er is the most difficult to climb?",
		answers:["Little Bear Peak","Longs Peak","Capitol Peak"],
		correctAnswer:3,
		userAnswer:0};
	var quizQuestions = [q1,q2,q3,q4,q5,q6];

	this.getQuizName = function() {
		return quizName;
	}

	this.getQuestions = function() {
		return quizQuestions;
	}

	this.getQuestion = function(num) {
		if (num <= 0) return;
		return quizQuestions[num-1];
	}
}

$(document).ready(function() {
	var quiz = new ColoradoFourteeners();
	var name = quiz.getQuizName();
	var questions = {};
	var numQuestions = 0;
	var currentQ = 0;
	var preLetters = ['A)','B)','C)','D)','E)','F)','G)','H)','I)','J)','K)','L)','M)','N)',
                      'O)','P)','Q)','R)','S)','T)','U)','V)','W)','X)','Y)','Z)'];

	// Get quiz name and show it in the DOM
	$('#quizTitle').html("Quiz subject: " + quiz.getQuizName());

	// Get list of questions and keep track of the number of questions in the quiz
	var questions = quiz.getQuestions();
	numQuestions = questions.length;

	// Hide the 'prev' button
	$('#prev').css('visibility', 'hidden');

	function showQuestion(qNum) {
		// Display the question header
		var showNum = qNum+1;		

		// Hide the 'prev' or 'next' button if needed
		(showNum <= 1) ?  $('#prev').css('visibility', 'hidden') :
		                  $('#prev').css('visibility', 'visible');
		(showNum >= numQuestions) ? $('#next').css('visibility', 'hidden') :
									$('#next').css('visibility', 'visible');

		// Display the question number
		$('#questionNum h4').text('Question ' + showNum + ' of ' + numQuestions);

		// Display the question
		$('#question').text(questions[qNum].question);

		// Display the possible answers
		var htmlText = "";
		var question = questions[qNum];
		for (var ans in question.answers) {
			htmlText += '<li><input type="radio" name="answer"><label for="answer">'+
						preLetters[ans]+' '+
			            question.answers[ans]+'</label></li>'
		}
		$(htmlText).appendTo('#answers');
	}

	function clearForm() {
		$('#answers').empty();
		$('#correctOrIncorrect').empty();
	}

	// Display the first question
	clearForm();
	showQuestion(0);

	// Record answer
	$('#answers').on('change', 'input[type="radio"]', function(event) {
		var pickedAns = $(this).next().html().split(') ')[1];
		var question = quiz.getQuestion(currentQ+1);
		var correctAns = question.answers[question.correctAnswer-1];
		if (correctAns === pickedAns) {
			$('#correctOrIncorrect').addClass('correct');
			$('#correctOrIncorrect').text('Correct!');
		} else {
			$('#correctOrIncorrect').removeClass('correct');
			$('#correctOrIncorrect').text('Incorrect');
		}
	});

	// Hook up the next button
	$('#nextpic').click(function() {
		clearForm();
		showQuestion(++currentQ);
	});

	// Hook up the prev button
	$('#prevpic').click(function() {
		clearForm();
		showQuestion(--currentQ);
	});

	// jQuery UI code for tooltips
	$(document).tooltip();
});

