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
	var q7={
		question:"Which 14er is John's favorite?",
		answers:["North Maroon Peak","Longs Peak","Mt. Yale"],
		correctAnswer:2,
		userAnswer:0};
	var quizQuestions = [q1,q2,q3,q4,q5,q6,q7];

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
	var numCorrect = 0, numIncorrect = 0;
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

	// Display the first question
	showQuestion(0);

	function updateForm(qNum) {
		$('#answers').fadeOut('slow', function() { // Use the function to make sure the fadeOut is
			clearForm();                           // done before we move on to clearing and showing
			showForm(qNum);
		});
	}

	function clearForm() {
		$('#answers').empty();
		$('#correctOrIncorrect').empty();
	}

	function showForm(qNum) {
		showQuestion(qNum);
		$('#answers').show(100, function() { // Use the function to make sure the fadeIn is
			disableFormIfNecessary();             // done before we possibly disable the form
		});
	}

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

	function disableFormIfNecessary() {
		// Disable if the user already picked an answer and then show their answer
		var question = quiz.getQuestion(currentQ+1);
		if (question.userAnswer > 0) {
			$('#answerForm input[type="radio"]').attr('disabled',true);
			if (question.userAnswer == question.correctAnswer) {
				$('#correctOrIncorrect').addClass('correct');
				$('#correctOrIncorrect').text('Correct!');
			} else {
				$('#correctOrIncorrect').removeClass('correct');
				$('#correctOrIncorrect').text('Incorrect');
			}

			$('#answerForm input[type="radio"]').each(function(index, elem) {
				var  dataIndex = index+1;
				if (dataIndex == question.userAnswer) {
					$(elem).prop('checked',true);
				}
			});
		}
	}

	// Record answer
	$('#answerForm').on('change', 'input[type="radio"]', function(event) {
		var pickedAns = $(this).next().html().split(') ')[1];
		var question = quiz.getQuestion(currentQ+1);

		// Display if correct or incorrect
		for (var i in question.answers) {
			var ans = question.answers[i];
			if (pickedAns === question.answers[i]) {
				question.userAnswer = Number(i)+1;
				break;
			}
		}

		// Figure out if the user picked the correct answer
		if (question.userAnswer == question.correctAnswer) {
			$('#correctOrIncorrect').addClass('correct');
			$('#correctOrIncorrect').text('Correct!');
			numCorrect++;
		} else {
			$('#correctOrIncorrect').removeClass('correct');
			$('#correctOrIncorrect').text('Incorrect');
			numIncorrect++;
		}

		// Disable form so the user can't change answer
		$('#answerForm input[type="radio"]').attr('disabled',true);

		// Update the stats
		$('#statsBox .correctArea').text(numCorrect);
		$('#statsBox .incorrectArea').text(numIncorrect);
	});

	// Hook up the next button
	$('#nextpic').click(function() {
		updateForm(++currentQ);
	});

	// Hook up the prev button
	$('#prevpic').click(function() {
		updateForm(--currentQ);
	});

	// jQuery UI code for tooltips
	$(document).tooltip();
});

