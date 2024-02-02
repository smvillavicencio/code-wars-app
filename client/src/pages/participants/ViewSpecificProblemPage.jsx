import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import {
  ProblemListTable,
  SponsorCarousel,
  Timer,
  TopBar
} from "../../components/index";

import {
	Button,
  Box,
  Stack,
	Tooltip,
  Typography,
} from "@mui/material";


// dummy data
const columns = [
	{
		field: "id",
		headerName: "#",
    minWidth: 60,
    maxWidth: 100,
    headerAlign: "center",
    align: "center",
		flex: 1,
	},
	{
		field: "problemTitle",
		headerName: "Problem Title",
    minWidth: 400,
    // maxWidth: 500,
		flex: 1,
	},
	{
		field: "status",
		headerName: "Status",
		minWidth: 150,
    // maxWidth: 200,
		flex: 1,
	},
	{
		field: "score",
		headerName: "Score",
    minWidth: 100,
    maxWidth: 200,
    headerAlign: "left",
    align: "left",
		flex: 1,
	},
	{
		field: "checkedBy",
		headerName: "Checked By",
    minWidth: 200,
    // maxWidth: 250,
    flex: 1,
	},
];

// dummy data
const rows = [
  { id: 1, problemTitle: 'Special Calculator', status: 'Unopened', score: 0/200, checkedBy: 'Sir Hermocilla'},
  { id: 2, problemTitle: 'Listing All Addends', status: 'Submitted', score: 0/400, checkedBy: 'Sir Isungga'},
  { id: 3, problemTitle: 'BINGO', status: 'Under Review', score: 0/400, checkedBy: 'Sir Doria'},
  { id: 4, problemTitle: 'Hamming distance, interleavings, and isomorphic', status: 'Unopened', score: 500/500, checkedBy: 'Sir Hermocilla'},
  { id: 5, problemTitle: 'The "Without" Problems', status: 'Done', score: 300/700, checkedBy: 'Sir Isungga' },
  { id: 6, problemTitle: 'Figuring Patterns', status: 'Done', score: 0/1000, checkedBy: 'Sir Doria' },
  { id: 7, problemTitle: 'Recursive Shifting', status: 'Submitted', score: 0/2800, checkedBy: 'Sir Hermocilla'},
  { id: 8, problemTitle: 'Sudoku Validator', status: 'Unopened', score: 0/5500, checkedBy: 'Sir Isungga'},
	{ id: 9, problemTitle: 'Figure Output Pattern', status: 'Unopened', score: 0/600, checkedBy: 'Sir Doria' },
	{ id: 10, problemTitle: 'Roman Numeral Calculator', status: 'Unopened', score: 0/700, checkedBy: 'Sir Hermocilla'},
];

const problemTitle = "Hamming distance, interleavings, and isomorphic"
const problemSubtitle = "UPLB Computer Science Society"
const problemDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mauris dolor, euismod nec commodo aliquam, porta vitae ante. Vivamus tincidunt egestas erat nec condimentum. Sed nec ex quis arcu lacinia laoreet. In interdum ipsum orci, ac gravida urna pharetra non. Etiam pretium, ipsum sed volutpat mollis, eros est hendrerit turpis, eget hendrerit libero dui ut eros. Donec sit amet dui sapien. Aliquam nec mi nec mauris placerat gravida. Cras egestas nisl semper semper mollis. Sed dictum augue congue porttitor ultricies. In accumsan, libero at suscipit aliquam, neque lorem eleifend velit, a vulputate lectus lorem in ante.\nMorbi non felis et lorem ultrices porttitor sit amet vitae est. Pellentesque magna urna, posuere a tincidunt a, vehicula sit amet ex. Vestibulum vehicula lectus eget consectetur imperdiet. Aenean interdum ante vel massa ultricies, a aliquet libero tempor. Mauris laoreet ipsum lacus, in iaculis nibh pharetra eget. Nunc eget purus egestas, elementum nulla eget, tincidunt nunc."
// const samples

const ViewSpecificProblemPage = ({
  // problemTitle,
  // problemSubtitle,
  // problemDescription,
  samples
}) => {
  return (
    // for the top bar and other components
    <Stack>
      <TopBar
        isImg={false}
        icon={<ArrowBackIcon
          sx={{
            cursor: 'pointer',
            fontSize: '3.5em',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: "rgba(201, 209, 231, 0.1)",
              color: "general.main",
            }
          }} />
        }
        title={problemTitle}
        subtitle={problemSubtitle}
        buttonText="UPLOAD FILE"
        startIcon={<FileUploadIcon />}
        // handleButton={}
      />

      {/* Other components */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {/* left column is for timer, leaderboard, sponsors' carousel */}
        <Stack
          spacing={5}
          sx={{
            mt: 5,
            mx: 8,
            minWidth: 350,
          }}
        >
          <Timer />
          <SponsorCarousel />
          <SponsorCarousel />
        </Stack>

        {/* right column is for problem description and sample inputs/outputs */}
        <Typography variant="body1">
          <Stack
            spacing={5}
            sx={{
              mt: 8,
              width: "95%",
            }}
          >
            {/* Problem Description */}
              <Box
              sx={{
                backgroundColor: '#fff',
                padding: 3,
                borderRadius: 4,
              }}
            >
              {problemDescription}
            </Box>
            
            {/* Sample Inputs and Outputs */}
            <Box
              sx={{
                display: 'flex',
                backgroundColor: '#fff',
                minHeight: 200,
                borderRadius: 4,
              }}
            >
              <Box sx={{ width: "50%", borderRight: 2,}}>
                <Typography
                  color="primary.contrastText"
                  sx={{
                    borderTopLeftRadius: 10,
                    bgcolor: "primary.main",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "1.10rem",
                    padding: 1,
                  }}
                >
                  Sample Inputs
                </Typography>
                <div></div>
              </Box>

              <Box sx={{ width: "50%" }}>
                <Typography
                  color="primary.contrastText"
                  sx={{
                    borderTopRightRadius: 10,
                    bgcolor: "primary.main",
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "1.10rem",
                    padding: 1,
                  }}
                >
                  Sample Outputs
                </Typography>
                <div></div>
              </Box>
            </Box>
          </Stack>
        </Typography>
      </Box>
    </Stack>
  )
};

export default ViewSpecificProblemPage;