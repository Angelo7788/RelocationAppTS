import Styled from 'styled-components/native';

export const MainContainer = Styled.View`
  margin-top: 10px;
`;

export const MarkerImage = Styled.Image`
  width: 90%;
  height: 50%;
  resize-mode: cover;
  border-radius: 10px;
  margin: 10px;
`;

export const HeartMarker = Styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 40px;
`;

export const TitleLabel = Styled.Text`
  font-size: 40px;
  font-weight: bold;
`;

export const Description = Styled.Text`
  padding-horizontal: 10px;
  margin-vertical: 5px;
`;
