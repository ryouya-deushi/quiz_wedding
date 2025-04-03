let lastscore;
window.onload = function() {
			if (localStorage.getItem("quizAnswered")) {
				let imgTag = '<img src="https://raw.githubusercontent.com/ryouya-deushi/quiz_wedding/develop/icon.jpg" style="height: 1em; vertical-align: +0.001em; cursor: pointer;" onclick="clickImage()">';
				document.getElementById("quiz-title").innerHTML = `${imgTag}Quiz`;
				document.body.classList.add("transparent-background");
				document.getElementById("passwordPrompt").innerText = "ご回答ありがとうございました！";
				const txtbox = document.getElementById("passwdBox");
				txtbox.disabled = true;
				txtbox.placeholder = "期待度：青 < 緑 < 赤 < 虹";
				
				let savedData = localStorage.getItem("quizData");
				let data = JSON.parse(savedData);
				let output = "<br><br>";
				for (const key in data) {
					if (data.hasOwnProperty(key)) {
						output += `${key}: ${data[key]}<br>`;
					}
				}
				document.getElementById("resultBox").innerHTML = output;
				document.getElementById("resultBox").style.textAlign = "left";
				
				const btn = document.getElementById("passwdBtn");
	        		btn.value = "Click!";
				let isClicked = false;
	        		lastscore = parseInt(localStorage.getItem("quizScore") || "0", 10);
	        		let originalText = resultBox.innerHTML; // 初期状態を保存
	        		btn.onclick = function() {
				if(isClicked){
					resultBox.style.color = "black";
					resultBox.innerHTML = originalText;  // 元のテキストを復元
					btn.value = "Click!";
				} else {
					originalText = resultBox.innerHTML; // 変更前のテキストを保存（毎回必ず）
					if(lastscore <= 3){
							resultBox.style.color = "blue";
						} else if(lastscore > 3 && lastscore <= 6){
							resultBox.style.color = "green";
						} else if(lastscore > 6 && lastscore <= 9){
							resultBox.style.color = "red";
						} else {
							rainbowTextWithBr("resultBox");
						}
						btn.value = "Return!";
				}
				isClicked = !isClicked;
		            };
			}
		};

		function clickImage() {
	        	alert("Thanks for finding it. In return, I'll make it rainbow-colored for you.");
	        	lastscore = 10;
	        }
		
		document.getElementById('loginSection').style.display = 'block';
		
		function authenticate(sectionId) {
			const currentSection = document.querySelector('.input-section:not([style*="display: none"])');
			if (currentSection) {
				sectionHistory.push(currentSection.id);
				currentSection.style.display = 'none';
			}
			document.getElementById(sectionId).style.display = 'block';
		}
		
		function showExpectation() {
			document.getElementById("extraText").style.display = "block";
			let score = localStorage.getItem("quizScore");
			if(score <= 3){
				document.getElementById("exitSection").style.color = "blue";
			} else if(score > 3 && score <= 6){
				document.getElementById("exitSection").style.color = "green";
			} else if(score > 6 && score <= 9){
				document.getElementById("exitSection").style.color = "red";
			} else {
				rainbowText("exitSection");
			}
        }

		const sectionHistory = [];
		function showNextSection(sectionId, questionName) {
			const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
			if (!selectedOption) {
				alert("選択してください");
				return;
			}

			const currentSection = document.querySelector('.input-section:not([style*="display: none"])');
			if (currentSection) {
				sectionHistory.push(currentSection.id);
				currentSection.style.display = 'none';
			}
			document.getElementById(sectionId).style.display = 'block';
		}

		function showPreviousSection() {
			if (sectionHistory.length > 0) {
				const previousSectionId = sectionHistory.pop();
				const currentSection = document.querySelector('.input-section:not([style*="display: none"])');
				if (currentSection) {
					currentSection.style.display = 'none';
				}
				
				document.getElementById(previousSectionId).style.display = 'block';
			}
		}
		
		
		function startQuiz(sectionId) {
			let name = document.getElementById("YourName").value;
			if (name.trim() === "") {
				alert("名前を入力してください。");
				return;
			} else if (name.length > 10) {
				alert("名前は10文字以内で入力してください。");
				return;
			}
			document.getElementById("welcomeMessage").innerText = `${name}様`;
			authenticate(sectionId);
		}
		
		
		const url = "https://script.google.com/macros/s/AKfycbzL31iwqTDoJdt-n17ACUcm75dl68Uy5YvHgoPtWZWsqVvEJMVfjcNY3ybA3rrbznbswg/exec";
		function receiveForm() {
			document.getElementById("passwdBtn").disabled = true;
			document.getElementById("passwdBox").disabled = true;
			document.getElementById("resultBox").innerText = "認証中。少々お待ちください。";
			const inputValue = document.getElementById('passwdBox').value.toLowerCase();
			const GET_options = {
				method: "GET",
			};

			fetch(url, GET_options)
			.then(response => response.json())
			.then(data => {
			const cellValue = data.cellValue;
			if (inputValue === cellValue) {
				authenticate('inputNameSection');
			} else {
			  document.getElementById("resultBox").innerText = "パスワードが間違っています。再度入力してください。";
			  document.getElementById("passwdBtn").disabled = false;
			  document.getElementById("passwdBox").disabled = false;
			}
			})
			.catch((error) => {
				console.error('Error:', error);
				alert("エラーが発生しました。再度お試しください。");
				document.getElementById("passwdBtn").disabled = false;
				document.getElementById("passwdBox").disabled = false;
			});
		}
		
		
		const correctAnswers = {
		    Q1: "サックス",
		    Q2: "シンガポール",
		    Q3: "6回",
		    Q4: "バスケ",
		    Q5: "Pazzo",
		    Q6: "800時間",
		    Q7: "イネ",
		    Q8: "韓国",
		    Q9: "コンサート参戦",
		    Q10: "グリーン",
		};

		const colors = [
			"red",
			"orange",
			"gold",
			"green",
			"blue",
			"indigo",
			"violet"
		];
		
		function rainbowText(elementId) {
			const element = document.getElementById(elementId);
			const children = element.children; // すべての子要素を取得

			for (let i = 0; i < children.length; i++) {
				const child = children[i];

				// extraTextの変更を避ける
				if (child.id === "extraText") {
					continue;
				}

				// テキストを持つ要素に対してのみ実行（ボタンは無視）
				if (child.tagName === "H2" || child.tagName === "H3") {
					const text = child.innerText;
					child.innerHTML = ""; // クリアして再構築

					for (let j = 0; j < text.length; j++) {
						const span = document.createElement("span");
						span.innerText = text[j];
						span.style.color = colors[j % colors.length];
						child.appendChild(span);
					}
				}
			}
		}
		
		function rainbowTextWithBr(elementId) {
		    const element = document.getElementById(elementId);
		    // innerHTMLを取得（<br>などのタグも含む）
		    const html = element.innerHTML;
		    let rainbowHTML = "";
		    let colorIndex = 0;
		    // HTMLを1文字ずつ処理
		    for (let i = 0; i < html.length; i++) {
		        const char = html[i];

		        // <br>タグなどのタグ部分はそのまま通す
		        if (char === "<") {
		            const tagEnd = html.indexOf(">", i);
		            rainbowHTML += html.slice(i, tagEnd + 1);
		            i = tagEnd; // インデックスをタグの末尾に飛ばす
		        } else if (char.trim() === "") {
		            // 空白や改行はそのまま
		            rainbowHTML += char;
		        } else {
		            // それ以外の文字に色をつける
		            const color = colors[colorIndex % colors.length];
		            rainbowHTML += `<span style="color: ${color}">${char}</span>`;
		            colorIndex++;
		        }
		    }

		    // 変換後のHTMLをセット
		    element.innerHTML = rainbowHTML;
		}


		function submitForm(questionName) {
			const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
			if (!selectedOption) {
				alert("選択してください");
				return;
			}
			document.getElementById("submitBtn").disabled = true;
			document.getElementById("preBtn10").disabled = true;
			document.getElementById("ptext").innerText = "送信中。少々お待ちください。";
			const formData = new FormData(document.getElementById('testForm'));
			const data = {};
			formData.forEach((value, key) => {
				data[key] = value;
			});
			
			let score = 0;
			for (const key in correctAnswers) {
			    if (data[key] === correctAnswers[key]) {
			        score++;
			    }
			}
			
			const POST_options = {
				method: "POST",
				body: JSON.stringify(data),
			};

			fetch(url, POST_options)
			.then(response => response.json())
			.then(response => {
	            if (response.result === true) {
	            	showNextSection('exitSection', questionName);
					localStorage.setItem("quizAnswered", "true");
					localStorage.setItem("quizData", JSON.stringify(data));
					localStorage.setItem("quizScore", JSON.stringify(score));
	            } else {
					document.getElementById("ptext").innerText = "送信失敗。再度お試しください。";
	                document.getElementById("submitBtn").disabled = false;
					document.getElementById("preBtn10").disabled = false;
	            }
	        })
	        .catch(error => {
	            console.error('Error:', error);
	            alert("エラーが発生しました。再度お試しください。");
	            document.getElementById("submitBtn").disabled = false;
				document.getElementById("preBtn10").disabled = false;
	        });
	    }
