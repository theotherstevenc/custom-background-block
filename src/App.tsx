import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import SDK from 'blocksdk'

const sdk = new SDK(null, null, true)

function App() {
  const [imageURL, setImageURL] = useState<string>(sdk.getData('imageURL') || 'https://placecats.com/millie/420/500')
  const [imageWidth, setImageWidth] = useState<string>(sdk.getData('imageWidth') || '420')
  const [imageHeight, setImageHeight] = useState<string>(sdk.getData('imageHeight') || '500')
  const [imageBackgroundColor, setImageBackgroundColor] = useState<string>(
    sdk.getData('imageBackgroundColor') || '#808080'
  )
  const [textOverlay, setTextOverlay] = useState<string>(sdk.getData('textOverlay') || 'scratch or die')
  const [textColor, setTextColor] = useState<string>(sdk.getData('textColor') || '#FFA500')
  const [textBackgroundColor, setTextBackgroundColor] = useState<string>(
    sdk.getData('textBackgroundColor') || '#000000'
  )

  const vmlWidth = Number(imageWidth) * 0.75
  const vmlHeight = Number(imageHeight) * 0.75

  useEffect(() => {
    const markUp = `
    <table role="none" style="width:${imageWidth}px;" cellpadding="0" cellspacing="0" border="0" class="outer-tbl">
      <tr>
        <td align="center" bgcolor="${imageBackgroundColor}" background="${imageURL}" width="${imageWidth}" height="${imageHeight}" valign="middle" style="color: ${textColor}; background: url(${imageURL}) center / cover no-repeat ${imageBackgroundColor}; background-position: center; background-size: cover; background-repeat: no-repeat;" class="w100pc">
          <!--[if gte mso 9]>
          <v:image xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block; width: ${vmlWidth}pt; height: ${vmlHeight}pt;" src="${imageURL}" />
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="f" stroke="false" style="border: 0;display: inline-block;position: absolute; width: ${vmlWidth}pt; height:${vmlHeight}pt;">
            <v:fill opacity="0%" color="${imageBackgroundColor}" />
            <v:textbox inset="0,0,0,0">
          <![endif]-->
                  <div data-type="slot" data-key="" data-label="custom background content"></div>
          <!--[if gte mso 9]>
            </v:textbox>
          </v:rect>
          <![endif]-->
        </td>
      </tr>
    </table>
`
    sdk.setContent(markUp)
  }, [
    imageBackgroundColor,
    imageURL,
    imageWidth,
    imageHeight,
    textOverlay,
    textColor,
    textBackgroundColor,
    vmlWidth,
    vmlHeight,
  ])

  const handleImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(event.target.value)
    sdk.setData('imageURL', event.target.value)
  }

  const handleImageWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageWidth(event.target.value)
    sdk.setData('imageWidth', event.target.value)
  }

  const handleImageHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageHeight(event.target.value)
    sdk.setData('imageHeight', event.target.value)
  }

  const handleTextOverlay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextOverlay(event.target.value)
    sdk.setData('textOverlay', event.target.value)
  }

  const handleTextColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(event.target.value)
    sdk.setData('textColor', event.target.value)
  }

  const handleTextBackgroundColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextBackgroundColor(event.target.value)
    sdk.setData('textBackgroundColor', event.target.value)
  }

  const handleImageBackgroundColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageBackgroundColor(event.target.value)
    sdk.setData('imageBackgroundColor', event.target.value)
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <TextField
          id='outlined-basic'
          label='Image URL'
          variant='outlined'
          fullWidth
          value={imageURL}
          onChange={handleImageURL}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          id='outlined-basic'
          label='Image Width'
          variant='outlined'
          fullWidth
          value={imageWidth}
          onChange={handleImageWidth}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          id='outlined-basic'
          label='Image Height'
          variant='outlined'
          fullWidth
          value={imageHeight}
          onChange={handleImageHeight}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          id='outlined-basic'
          label='Text Overlay'
          variant='outlined'
          fullWidth
          value={textOverlay}
          onChange={handleTextOverlay}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          id='outlined-basic'
          label='Text Color'
          variant='outlined'
          type='color'
          fullWidth
          value={textColor}
          onChange={handleTextColor}
        />
        <TextField
          id='outlined-basic'
          label='Text Background Color'
          variant='outlined'
          type='color'
          fullWidth
          value={textBackgroundColor}
          onChange={handleTextBackgroundColor}
        />
        <TextField
          id='outlined-basic'
          label='Image Background Color'
          variant='outlined'
          type='color'
          fullWidth
          value={imageBackgroundColor}
          onChange={handleImageBackgroundColor}
        />
      </Box>
    </>
  )
}

export default App
