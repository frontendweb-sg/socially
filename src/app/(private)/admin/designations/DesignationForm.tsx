import Button from "@/components/controls/Button";
import Form from "@/components/controls/Form";
import FormGroup from "@/components/controls/FormGroup";
import Input from "@/components/controls/Input";
import axios from "axios";
import { IDesignationDoc } from "@/models/designation";
import { designationService } from "@/services/designaion.service";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AppContent } from "@/utils/content";
import * as yup from "yup";
import Box from "@/components/controls/Box";

const validation = yup.object().shape({
  title: yup.string().required("Skill name is required!"),
  slug: yup.string(),
});

type DesignationProps = {
  designation?: IDesignationDoc;
  onClose?: () => void;
};

const DesignationForm = ({
  designation,
  onClose,
  ...rest
}: DesignationProps) => {
  const router = useRouter();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: designationService.getIntialData(),
    validationSchema: validation,
    async onSubmit(values, formikHelpers) {},
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          name="title"
          value={values.title}
          errors={errors}
          touched={touched}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormGroup>

      <Box className="d-flex justify-content-end">
        <Button type="button" className="me-3" onClick={onClose}>
          {AppContent.cancel}
        </Button>
        <Button
          loading={isSubmitting}
          disabled={values.title.length === 0 || isSubmitting}
          type="submit"
        >
          {AppContent.save}
        </Button>
      </Box>
    </Form>
  );
};
export default DesignationForm;
