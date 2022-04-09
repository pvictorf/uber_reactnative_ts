import {View} from 'react-native';

interface DividerProps {
  bgColor?: string,
  children?: JSX.Element,
  height?: number,
}

export const Divider = ({bgColor = '#ddd', height = 0.6, children}: DividerProps) => {
  return (
    <View style={{ height: height, backgroundColor: bgColor }}>
      {children}
    </View>
  );
}

