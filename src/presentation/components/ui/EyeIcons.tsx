import { Platform, View } from 'react-native';

type IconProps = {
  size?: number;
  color?: string;
};

export function EyeIcon({ size = 18, color = '#94A3B8' }: IconProps) {
  if (Platform.OS === 'web') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'block' }}
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  // Cross-platform native representation
  return (
    <View
      style={{
        width: size,
        height: size * 0.65,
        borderRadius: size,
        borderWidth: 1.5,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.35,
          height: size * 0.35,
          borderRadius: size,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

export function EyeOffIcon({ size = 18, color = '#94A3B8' }: IconProps) {
  if (Platform.OS === 'web') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'block' }}
      >
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
      </svg>
    );
  }

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: size,
          height: size * 0.65,
          borderRadius: size,
          borderWidth: 1.5,
          borderColor: color,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.6,
        }}
      >
        <View
          style={{
            width: size * 0.35,
            height: size * 0.35,
            borderRadius: size,
            backgroundColor: color,
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          width: size * 1.2,
          height: 1.5,
          backgroundColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}

