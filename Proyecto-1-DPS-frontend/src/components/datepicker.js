import { forwardRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerCustom({startDate, onChange, label, dateValue, disabled, dateFormat}) {

    const CustomInput = forwardRef(({value, onClick, className}, ref) => (
        <Form.Group className="mb-3" controlid={"form.formControl" + label}>
            <Form.Label>{label}</Form.Label>
            <Form.Control disabled={disabled} ref={ref} onClick={onClick} type="text" value={value || ""} onChange={onChange} placeholder={startDate} />
        </Form.Group>
    ))

    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    return(
        <DatePicker disabled={disabled} selected={dateValue || new Date()} onChange={onChange} dateFormat={dateFormat}
            customInput={<CustomInput/>}
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => {
                const newDate = new Date(date)
                return(
                    <Container>
                        <Row>
                            <Col className="col-3">
                                <Button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} variant="white">
                                    <i className="bi bi-caret-left"></i>
                                </Button>
                            </Col>
                            <Col className="align-self-center">
                                <label className="fw-bolder">{months[newDate?.getMonth()] + ' ' + newDate?.getFullYear()}</label>
                            </Col>
                            <Col  className="col-3">
                                <Button onClick={increaseMonth} disabled={nextMonthButtonDisabled} variant="white">
                                    <i className="bi bi-caret-right"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                )
            }}
            renderDayContents={(day, date) => (
                <span className="fw-semibold">{date.getDate()}</span>
            )}
        />
    )
}

export default DatePickerCustom;