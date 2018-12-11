//#extension GL_OES_standard_derivatives : enable 

#define FAST 1
#define Color4 vec4
#define Color3 vec3
#define Point3 vec3
#define Vector3 vec3
#define PI 3.14


#define AA 1  
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 resolution;
uniform vec3 campos;
uniform float power;
uniform float minimumDistanceToSurface;
//uniform Color3 keyLightColor  = Color3(0.0, 1., 0.0);
//uniform Color3 fillLightColor = Color3(0.0, 0.5, 0.1);
//uniform Color3 specularColor = Color3(1.3, 0.0, 1.2);
uniform Color3 keyLightColor;
uniform Color3 fillLightColor;
uniform Color3 specularColor;
////////////////////////////////////////////////////////////

const Vector3 lightDirection = Point3(0.57735026919, 0.57735026919, -0.57735026919);
const Color3 backgroundGradientRimColor = Color3(1., 1., 1.);

const int ITERATIONS = 64;
const int RAY_MARCH_ITERATIONS = 512;

const float externalBoundingRadius = 2.;
const float internalBoundingRadius = 0.;

////////////////////////////////////////////////////////////
float pitch = PI*0.5;
float yaw = PI;
mat3 rotation;
Vector3 eps;
////////////////////////////////////////////////////////////

float distanceToSurface(Point3 P, out float AO) {
    P=P*rotation;

    AO = 1.0;
    Point3 Q = P;

    float r = length(P) - externalBoundingRadius;

    if (r > 1.0) { 
        return r;
    }


    float derivative = 1.0;
    
    for (int i = 0; i < ITERATIONS; ++i) {

        AO *= 0.725;
        float r = length(Q);
        
        if (r > 2.) {
            AO = min((AO + 0.075) * 4.1, 1.0);
            return min(length(P), 0.5 * log(r) * r / derivative);
        } else {
            float theta = acos(Q.z / r) * power;
            float phi   = atan(Q.y, Q.x) * power;
            float sinTheta = sin(theta);
            
            Q = Vector3(sinTheta * cos(phi),
                        sinTheta * sin(phi),
                        cos(theta)) * pow(r, power) + P;

            derivative = pow(r, power - 1.0) * power * derivative + 1.0;
        }
    }
    
    return minimumDistanceToSurface;
}


float distanceToSurface(Point3 P) {
    float ignore;
    return distanceToSurface(P, ignore);
}


Color3 trace(Vector3 rayOrigin, Vector3 rayDirection) {

    float t = 0.0;
    float d;
    bool hit = false;
    Point3 X;


    for (int i = 0; i < RAY_MARCH_ITERATIONS; ++i) {                        
        X = rayOrigin + rayDirection * t;
        
        d = distanceToSurface(X);
        hit = (d < minimumDistanceToSurface);
        if (hit) { break; }

        t += d;
    }

    if (hit) {
        float AO;
        distanceToSurface(X, AO);
                
        X -= rayDirection * eps.x;
                
        Vector3 n = normalize(
            Vector3(d - distanceToSurface(X - eps.xyz),
                    d - distanceToSurface(X - eps.yxz),
                    d - distanceToSurface(X - eps.zyx)));
        
        Vector3 n2 = normalize(
            Vector3(d - distanceToSurface(X - eps.xyz * 50.0),
                    d - distanceToSurface(X - eps.yxz * 50.0),
                    d - distanceToSurface(X - eps.zyx * 50.0)));

        n = normalize(n + n2 + normalize(X));

        return AO * mix(fillLightColor, keyLightColor, AO * clamp(0.7 * dot(lightDirection, n) + 0.6, 0.0, 1.0)) + AO * pow(max(dot(lightDirection, n2), 0.0), 5.0) * specularColor;
    } else {
        //return mix(backgroundGradientCenterColor, backgroundGradientRimColor, sqrt(length((gl_FragCoord.xy / resolution.xy - vec2(0.66, 0.66)) * 2.5)));

        return backgroundGradientRimColor;
    }
}


void main(void) {

    vec2 aspect = vec2(resolution.x / resolution.y, 1.0);
    vec2 screenCoords = (2.0 * gl_FragCoord.xy / resolution.xy - 1.0) * aspect;
    vec3 lookAt = vec3(0.); 
    vec3 forward = normalize(lookAt - campos); 
    vec3 right = normalize(vec3(forward.z, 0., -forward.x ));
    vec3 up = normalize(cross(forward,right));
    vec3 rd = normalize(forward + screenCoords.x * right + screenCoords.y * up);

    rotation = 
    mat3(1.0, 0.0, 0.0, 0.0, cos(pitch), -sin(pitch), 0.0, sin(pitch), cos(pitch)) *
    mat3(cos(yaw), 0.0, sin(yaw), 0.0, 1.0, 0.0, -sin(yaw), 0.0, cos(yaw));
    //mat3(cos(roll), -sin(roll), 0.0, sin(roll), cos(roll), 0.0,  0.0, 0.0,1.0)

    eps = Vector3( 0.0005 * minimumDistanceToSurface, 0.0, 0.0);

    Color3 color = trace(campos,rd);

    color = sqrt(color);
    vec2 xy = 2.0 * gl_FragCoord.xy / resolution.xy - 1.0;
    color *= 0.5 + 0.5*pow((xy.x+1.0)*(xy.y+1.0)*(xy.x-1.0)*(xy.y-1.0), 0.2);

    gl_FragColor = vec4(color, 1.0);
}