import {FC} from 'react';
import React from 'react';
import {Text as NBText} from 'react-native';

const Text: FC<Props> = props => {
  return (
    <NBText
      style={{
        fontFamily: 'Raleway-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        marginVertical: 1,
        textAlign: 'center',
      }}
      {...props}>
      {props.children}
    </NBText>
  );
};

interface Props extends React.ComponentProps<typeof NBText> {
  children: React.ReactNode;
}

export default Text;
