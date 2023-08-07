"use client";
import Col from "@/components/controls/Col";
import Form from "@/components/controls/Form";
import Input from "@/components/controls/Input";
import Row from "@/components/controls/Row";
import Textarea from "@/components/controls/Textarea";
import { useFormik } from "formik";

const AddEducation = () => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
  } = useFormik({
    initialValues: {
      college: "",
      stream: "",
      from: null,
      to: null,
      location: "",
      summary: "",
      board: "",
      medium: "",
      grade: "",
      marks: "",
      current: false,
      subjects: null,
    },
    async onSubmit(values, formikHelpers) {
      console.log("values", values);
    },
  });
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Col>
          <Input
            name="board"
            value={values.board}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Input
            name="college"
            value={values.college}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            name="stream"
            value={values.stream}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Input
            name="subjects"
            value={values.subjects!}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Input
            name="location"
            value={values.location}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            name="medium"
            value={values.medium}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Input
            name="stream"
            value={values.stream}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            name="marks"
            value={values.marks}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Input
            type="checkbox"
            name="current"
            checked={values.current}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Textarea
            name="summary"
            value={values.summary}
            errors={errors}
            touched={touched}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AddEducation;
