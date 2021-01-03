import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, Testability, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Test } from "./test.model";
import { TestService } from "./test.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'online-test-app';
  createQuestion: boolean;
  questionNo: number;
  questionType: string;
  isMcq:boolean;
  questionForm: FormGroup;
  questions:FormArray;
  options:FormArray;
  testData: Test;

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  constructor(private _ngZone: NgZone, private fb: FormBuilder, private testService: TestService) {
    this.createQuestion = false;
    this.questionNo = 0;
    this.testData = new Test();
    //this.triggerResize();
    this.questionForm = this.fb.group({
      subject:'',
      time:'',
      questions: this.fb.array([this.createQuestionForm()])});
    
  }

  ngOnInit(){
    //console.log(this.questionForm);
  }

  createQuestionForm() {
    return this.fb.group({
      questionText:'',
      marks:'',
      isMcq:false,
      questionType:'mcq',
      correctOption:['',ValidateCorrectOption],
      options: this.fb.array([this.createOptionForm(1)])
    });
  }

  createOptionForm(num?:number){
    return this.fb.group({
      optionLabel:num,
      optionText:''
    })
  }

  get QF(){
    return this.questionForm.controls;
  }

  get Q(){
    return this.QF.questions as FormArray;
  }

  get OPS(){
    return this.QF.questions.get('options') as FormArray;
  }

 
  onCreateQuestion(){
    this.createQuestion = !this.createQuestion;
  }

  onAddQuestion(){
    this.questionNo++;
    this.questions = this.questionForm.get('questions') as FormArray;
    this.questions.push(this.createQuestionForm());
  }

  onRemoveQuestion(){
    this.questions = this.questionForm.get('questions') as FormArray;
    this.questions.removeAt(this.questionNo);
    this.questionNo--;
  }

  onAddOption(optionData:FormArray){
    this.options = optionData;
    this.options.push(this.createOptionForm(optionData.value.length+1));
  }

  onRemoveOption(optionData:FormArray){
    this.options.removeAt(optionData.value.length-1);
  }

  // triggerResize() {
  //   // Wait for changes to be applied, then trigger textarea resize.
  //   this._ngZone.onStable.subscribe(() => this.autosize.resizeToFitContent(true));
  // }

  sequenceOf(num: number){
    return Array(num);
  }

  onRadioChange(data:any){
    console.log(data);
    console.log(this.questionForm.getRawValue());
    // let questionArray = this.questionForm.getRawValue();
    
  
    // if(this.questionType == 'mcq') 
    //   this.isMcq = true;
    // else 
    //   this.isMcq = false;
  }

  onSubmit(formData?: FormData){
    console.log(this.questionForm.value);
    let qData = this.questionForm.value;
    this.testData.subject = qData.subject;
    this.testData.timeLimitInMins = qData.time;
    this.testData.questions = qData.questions;
    this.testService.createTest(this.testData).subscribe(res=> console.log(res));
  }
}

function ValidateCorrectOption(control: AbstractControl) {
  let parentFG = control['_parent'] as FormGroup;
  if (control.value && control.value > parentFG.value['options'].length) {
    return { 'wrongOption': true };
  }
  return null;
}
