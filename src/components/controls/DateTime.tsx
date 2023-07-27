import {
  format as Format,
  formatDistance,
  formatRelative,
  subDays,
} from "date-fns";
import Box from "./Box";

type Props = {
  date: string;
  format?: string;
  exact?: boolean;
};
const DateTime = ({ exact = false, date, format = "Pp" }: Props) => {
  return (
    <Box className="date-time">
      {exact
        ? Format(new Date(date), format!)
        : formatDistance(subDays(new Date(date), 0), new Date(), {
            addSuffix: true,
          })}
    </Box>
  );
};

export default DateTime;
