import {TemplateRef, ViewChild} from '@angular/core';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;

  public paymentAddButtonDisabled = true;
  public nameInput = true;
  public costInput = true;
  public sum = 0;
  editedPayment: Payment;
  payments: Array<Payment>;
  idCount = 0;

  // проверка ввода имени платежа
  checkNameInput(input) {
    this.nameInput = !input.match(/[а-яa-z]/ig);
    this.checkInput();
    return;
  }

  // проверка ввода стоимости платежа
  checkCostInput(input) {
    this.costInput = input <= 0 || !input;
    this.checkInput();
    return;
  }

  // проверка обоих вводов
  checkInput() {
    if (this.nameInput || this.costInput) {
      this.paymentAddButtonDisabled = true;
    } else {
      this.paymentAddButtonDisabled = false;
    }
    return;
  }

  constructor() {
    this.payments = new Array<Payment>();
  }

  // добавление платежа
  addPayment(PaymentName, PaymentCost) {
        this.editedPayment = new Payment(this.idCount, PaymentName, PaymentCost, 0);
        this.payments.push(this.editedPayment);
        this.idCount++;
  }

    // загружаем шаблон
    loadTemplate() {
      return this.readOnlyTemplate;
    }

    // удаление платежа
    deletePayment(payment: Payment) {
      const index = this.payments.indexOf(payment);
      this.payments.splice(index, 1);
      this.changeSum();
    }

  countCost(payment: Payment, e) {
     if (e.target.checked) {
       const index = this.payments.indexOf(payment);
       this.payments[index].multiplier++;
     } else {
       const index = this.payments.indexOf(payment);
       this.payments[index].multiplier--;
     }
    this.changeSum();
  }

  changeSum() {
    this.sum = 0;
    this.payments.forEach(payment => this.sum += payment.Cost * payment.multiplier);
  }
}

class Payment {
  constructor(
    public Id: number,
    public Name: string,
    public Cost: number,
    public multiplier: number) { }
}
